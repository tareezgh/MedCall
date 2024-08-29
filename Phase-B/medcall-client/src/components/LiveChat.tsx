import { useEffect, useState, useRef } from "preact/hooks";
import Message from "./Messages";

import Button from "./Button";
import { PhoneIcon, SendIcon } from "./icons";
import { useSelector } from "react-redux";
import { getConversation, getMessages } from "../services/conversationService";
import Input from "./Input";
import { useTranslation } from "react-i18next";

interface ChatMessage {
  text: string;
  me: boolean;
  senderId?: string;
  receiverId?: string;
}

interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Conversation {
  _id: string;
  participants: Participant[];
  lastMessage: string;
}

const LiveChat = () => {
  const { t } = useTranslation();
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [selectedConversationUsername, setSelectedConversationUsername] =
    useState<string>("");

  const [ws, setWs] = useState<WebSocket | null>(null);
  const currentUser = useSelector((state: any) => state.currentUser);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const wsUrl = import.meta.env.VITE_WS_URL;
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversation(currentUser.id);
        console.log("🚀 ~ fetchConversations ~ data:", data);

        setConversations(data);
        if (data) {
          handleConversationSelect(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
    // Create WebSocket connection
    const socket = new WebSocket(
      `${wsUrl}?userId=${encodeURIComponent(currentUser.id)}`
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", event.reason);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    if (selectedConversation) {
      // Fetch messages for the selected conversation
      const fetchMessages = async () => {
        try {
          const data = await getMessages(selectedConversation._id);
          console.log("🚀 ~ fetchConversations ~ data:", data);

          setMessages(data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (e: Event) => {
    e.preventDefault();
    if (chatMessage.trim() && ws && selectedConversation) {
      const targetParticipant = selectedConversation.participants.find(
        (participant) => participant._id !== currentUser.id
      );

      if (targetParticipant) {
        const targetId = targetParticipant._id;
        console.log("🚀 ~ handleSend ~ targetId:", targetId);
        const newMessage = {
          text: chatMessage,
          me: true,
          targetId, // Ensure this is the correct target ID
        };
        console.log("🚀 ~ handleSend ~ newMessage:", newMessage);
        ws.send(JSON.stringify(newMessage));
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setChatMessage("");
      } else {
        console.error("Target ID not found for the selected conversation.");
      }
    }
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    const receiver = conversation.participants.find(
      (participant: any) => participant._id !== currentUser.id
    );
    setSelectedConversationUsername(
      `${receiver?.firstName} ${receiver?.lastName}`
    );
  };

  const renderConversations = () => {
    return (
      <div className="mt-4 left-side flex flex-col gap-4 w-[20%]">
        <h1 className="text-4xl w-full text-start">Messages</h1>
        <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
          {conversations.map((conversation) => {
            // Get the receiver's information
            const receiver = conversation.participants.find(
              (participant: any) => participant._id !== currentUser.id
            );

            const isSelected = selectedConversation?._id === conversation._id;

            return (
              <button
                key={conversation._id}
                onClick={() => handleConversationSelect(conversation)}
                className={`flex flex-col items-center justify-center p-4 w-full rounded-lg shadow-md ${
                  isSelected
                    ? "bg-[#E4E4FD] text-secondary600"
                    : "bg-white hover:bg-[#E4E4FD]"
                }`}
              >
                {/* Display the receiver's name */}
                <h1 className="text-lg font-bold">
                  {receiver
                    ? `${receiver.firstName} ${receiver.lastName}`
                    : "Unknown"}
                </h1>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      {renderConversations()}

      <div className="right-side flex flex-col gap-4 w-[80%] ">
        <Button
          text="New Chat"
          type="secondary"
          onClick={() => {}}
          customClassName={"ml-auto p-4 rounded-2xl shadow-md text-xl"}
        />

        <div className="flex flex-col bg-white rounded-lg shadow-md h-[90%] p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-300">
            <h2 className="text-xl font-bold">
              {selectedConversationUsername}
            </h2>
            <div className="p-2 bg-gray-200 rounded-full">
              <PhoneIcon />
            </div>
          </div>

          <div className="flex flex-col h-[90%]">
            <div className="overflow-y-auto flex-grow">
              {messages.map((msg, index) => {
                return (
                  <Message
                    key={index}
                    text={msg.text}
                    me={msg.senderId === currentUser.id}
                  />
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          </div>
          {selectedConversation && (
            <form onSubmit={handleSend} className="flex justify-start gap-2">
              <Input
                placeholder={t("message-placeholder")}
                type={"text"}
                value={chatMessage}
                onChange={(e) =>
                  setChatMessage((e.target as HTMLInputElement).value)
                }
                customClassName="min-w-[500px]"
              />

              <button type="submit">
                <SendIcon />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
