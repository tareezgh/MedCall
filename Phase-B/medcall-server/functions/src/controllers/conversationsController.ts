import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";

export class ConversationController {
  public static async createConversation(req: Request, res: Response) {
    try {
      const { participants } = req.body;
      const service = new ConversationService();
      const conversation = await service.createConversation(participants);
      return res.status(200).send(conversation);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async getConversation(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const service = new ConversationService();
      const conversation = await service.getConversation(userId);
      return res.status(200).send(conversation);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async getMessages(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const service = new ConversationService();
      const messages = await service.getMessages(conversationId);
      return res.status(200).send(messages);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
