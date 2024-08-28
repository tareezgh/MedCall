import mongoose, { Document } from "mongoose";

export interface IMessage {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  participants: string[];
  messages: IMessage[];
}
