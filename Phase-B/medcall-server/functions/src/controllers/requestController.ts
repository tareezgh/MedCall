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

  public static async getAllRequests(req: Request, res: Response) {
    try {
      const service = new RequestService();
      const requests = await service.getAllRequests();
      return res.status(200).send(requests);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async getRequestByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const service = new RequestService();
      const request = await service.getRequestsByUserId(userId);
      return res.status(200).send(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async getActiveRequest(req: Request, res: Response) {
    try {
      const { status, id } = req.body;
      const service = new RequestService();
      const request = await service.getActiveRequest({ status, id });
      return res.status(200).send(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async getGuestRequest(req: Request, res: Response) {
    try {
      const { status, phoneNumber } = req.body;
      const service = new RequestService();
      const request = await service.getGuestRequest({ status, phoneNumber });
      return res.status(200).send(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  
  public static async updateRequest(req: Request, res: Response) {
    try {
      const requestId = req.params.id;
      const { status, driverId, driverName, driverLocation } = req.body;
      const service = new RequestService();
      const request = await service.updateRequest(requestId, {
        status,
        driverId,
        driverName,
        driverLocation,
      });
      return res.status(200).send(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
