import axios from "axios";
import { toast } from "react-toastify";
import { conversationUrl, getMessagesUrl } from "./constants";

export const createConversation = async (userId: string, targetUserId: string) => {
  try {
    const response = await axios.post(`${conversationUrl}`, {
      participants: [userId, targetUserId]
    });

    console.log("🚀 ~ createConversation ~ response:", response);
    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to get conversation", {
      position: "top-center",
      hideProgressBar: true,
    });
  }
};

export const getConversation = async (userId: string) => {
  try {
    const response = await axios.get(`${conversationUrl}/${userId}`);

    console.log("🚀 ~ getConversation ~ response:", response);
    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to get conversation", {
      position: "top-center",
      hideProgressBar: true,
    });
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const response = await axios.get(`${getMessagesUrl}/${conversationId}`);

    if (response.data.status === "failure") {
      toast.error(response.data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } else {
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to get messages", {
      position: "top-center",
      hideProgressBar: true,
    });
  }
};
