import { ConversationDal } from "../dal/conversation.dal";
import { IConversation } from "../interfaces/conversation.interface";

export class ConversationService {
  private conversationDal: ConversationDal;

  constructor(conversationDal: ConversationDal = new ConversationDal()) {
    this.conversationDal = conversationDal;
  }

  public async createConversation(participants: string[]) {
    return await this.conversationDal.createConversation(participants);
  }

  public async getConversation(userId: string) {
    return await this.conversationDal.getConversation(userId);
  }
  public async getMessages(conversationId: string) {
    return await this.conversationDal.getMessages(conversationId);
  }
}
