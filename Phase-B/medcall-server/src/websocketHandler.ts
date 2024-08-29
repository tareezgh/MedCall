import { Server as WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import http from "http";
import Conversation from "./db/models/conversation";

interface MessagePayload {
  targetId: string;
  text: string;
}

const usersById = new Map<string, WebSocket>();

const setupWebSocket = (server: http.Server): void => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const urlParams = new URLSearchParams(req.url?.split("?")[1] || "");
    const userId = urlParams.get("userId");

    if (userId) {
      usersById.set(userId, ws);
      console.log("🚀 ~ wss.on ~ usersById:", usersById);

      console.log(`User connected with userId: ${userId}`);

      ws.on("message", async (message) => {
        try {
          const parsedMessage: MessagePayload = JSON.parse(message.toString());
          const { targetId, text } = parsedMessage;

          // Always save the message to the database
          let conversation = await Conversation.findOne({
            participants: { $all: [userId, targetId], $size: 2 },
          });

          if (!conversation) {
            // Create a new conversation if none exists
            conversation = new Conversation({
              participants: [userId, targetId],
              messages: [],
            });
          }

          // Add the new message to the conversation
          conversation.messages.push({
            senderId: userId,
            receiverId: targetId,
            text,
            timestamp: new Date(),
          });

          await conversation.save();
          console.log("Message saved to database");

          // Send message to the target user if they're connected
          const targetWs = usersById.get(targetId);
          console.log("🚀 ~ ws.on ~ targetId:", targetId);
          if (targetWs?.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({ text, from: userId }));
          } else {
            console.log(`User with id: ${targetId} is not connected.`);
            // Optionally notify the sender about the offline status
          }
        } catch (error) {
          console.error("Failed to process message:", error);
        }
      });

      ws.on("close", () => {
        if (userId) {
          console.log(`User disconnected with userId: ${userId}`);
          usersById.delete(userId);
        }
      });

      ws.on("error", (error: Error) => {
        console.error("WebSocket error:", error);
      });
    } else {
      console.log("User connected without a userId.");
    }
  });
};

export default setupWebSocket;
