import mongoose, { Schema } from "mongoose";
import { IConversation } from "../../interfaces/conversation.interface";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "Users", required: true },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
