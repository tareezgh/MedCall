import { useEffect, useState } from "preact/hooks";
import Message from "./Messages";

import { SendIcon } from "./icons";
import { useSelector } from "react-redux";
import {
  createConversation,
  getConversation,
  getMessages,
} from "../services/conversationService";
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
  const activeRequest = useSelector(
    (state: any) => state.requests.activeRequest
  );

  const [ws, setWs] = useState<WebSocket | null>(null);
  const currentUser = useSelector((state: any) => state.currentUser);
  const wsUrl = import.meta.env.VITE_WS_URL;
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversation(currentUser.id);
        console.log("🚀 ~ fetchConversations ~ data:", data);

        setConversations(data.reverse());
        if (activeRequest) {
          const isDriver =
            activeRequest && activeRequest.driverId === currentUser.id;
          const targetId = isDriver
            ? activeRequest.userId
            : activeRequest.driverId;

          const existingConversation = data.find((conv: Conversation) =>
            conv.participants.some(
              (participant) => participant._id === currentUser.id
            )
          );

          if (existingConversation)
            handleConversationSelect(existingConversation);
          else {
            // If no conversation exists, create a new one
            await createConversation(currentUser.id, targetId);

            // Fetch conversations again to ensure complete data
            const updatedConversations = await getConversation(currentUser.id);
            setConversations(updatedConversations.reverse());
          }
        } else if (data.length > 0) {
          // If there's no active request, select the first conversation
          handleConversationSelect(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
    // Create WebSocket connection
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const socket = new WebSocket(
      `${wsProtocol}//${wsUrl}?userId=${encodeURIComponent(currentUser.id)}`
    );
    console.log(
      "🚀 ~ useEffect ~ ${wsProtocol}//${wsUrl}:",
      wsProtocol,
      "//",
      wsUrl
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

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

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
          me: false,
          senderId: currentUser.id,
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
      <div className="left-side flex flex-col gap-4 w-[20%]">
        <h1 className="text-2xl w-full text-start">
          {" "}
          {t("message-history-title")}
        </h1>
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
    <div className="flex flex-col gap-8 p-6 bg-modalBackground rounded-2xl w-full h-screen shadow-xl">
      <h2 className="text-3xl font-bold h-fit">{t("message-title")}</h2>
      <div className="flex flex-row justify-between gap-8 ">
        {/* Left Section */}
        {renderConversations()}

        {/* Right Section */}
        <div className="right-side flex flex-col gap-4 w-[80%]">
          <div className="flex flex-col bg-white rounded-lg shadow-xl p-4 max-h-[600px]">
            <div className="flex items-center justify-between pb-2 border-b border-gray-300">
              <h2 className="text-xl font-bold">
                {selectedConversationUsername}
              </h2>
            </div>
            <div className="flex flex-col overflow-y-auto min-h-[400px] max-h-[450px]">
              {messages.map((msg, index) => {
                return (
                  <Message
                    key={index}
                    text={msg.text}
                    me={msg.senderId === currentUser.id}
                  />
                );
              })}
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
    </div>
  );
};

export default LiveChat;
