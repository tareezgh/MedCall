import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { IRequest } from "../interfaces/request.interface";

export class RequestController {
  public static async postRequest(req: Request, res: Response) {
    try {
      const params: IRequest = req.body;
      const service = new RequestService();
      const request = await service.postRequest(params);
      return res.status(200).send(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
