import { Server as WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import http from "http";
import Conversation from "./db/models/conversation";
import Request from "./db/models/requests";

interface MessagePayload {
  targetId: string;
  text: string;
}

interface LocationUpdatePayload {
  requestId: string;
  driverLocation: { lat: number; long: number };
}

const usersById = new Map<string, WebSocket>();

const setupWebSocket = (server: http.Server): void => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const urlParams = new URLSearchParams(req.url?.split("?")[1] || "");
    const userId = urlParams.get("userId");

    if (userId) {
      usersById.set(userId, ws);
      console.log(`User connected with userId: ${userId}`);

      ws.on("message", async (message) => {
        try {
          const parsedMessage = JSON.parse(message.toString());
          // Handle chat messages
          if (parsedMessage.targetId) {
            const { targetId, text }: MessagePayload = parsedMessage;

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
          }

          // Handle location updates
          if (parsedMessage.requestId && parsedMessage.driverLocation) {
            const { requestId, driverLocation }: LocationUpdatePayload =
            parsedMessage;
            console.log("🚀 ~ ws.on ~ driverLocation:", driverLocation)

            // Update the request with the driver's new location
            await Request.updateOne(
              { _id: requestId },
              {
                $set: {
                  "driverLocation.lat": driverLocation.lat,
                  "driverLocation.long": driverLocation.long,
                },
              }
            );

            // Broadcast the updated location to all connected clients
            wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ requestId, driverLocation }));
              }
            });
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
