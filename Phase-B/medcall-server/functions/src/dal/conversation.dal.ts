import Conversation from "../db/models/conversation";
import { IConversation } from "../interfaces/conversation.interface";

export class ConversationDal {
  public async createConversation(participants: string[]): Promise<IConversation> {
    try {
      // Check if a conversation already exists with the given participants
      const existingConversation = await Conversation.findOne({
        participants: { $all: participants, $size: participants.length },
      });

      if (existingConversation) {
        return existingConversation; // Return existing conversation if found
      }

      // Create a new conversation if not found
      const newConversation = new Conversation({ participants, messages: [] });
      await newConversation.save();
      return newConversation;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getConversation(userId: string) {
    try {
      const conversation = await Conversation.find({
        participants: userId,
      }).populate('participants', 'firstName lastName'); 

      return conversation;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getMessages(conversationId: string) {
    try {
      const conversation = await Conversation.findById(conversationId)
      if(conversation)
        return conversation.messages;
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public findAll(query: any = null) {
    return Conversation.find(query);
  }
}
