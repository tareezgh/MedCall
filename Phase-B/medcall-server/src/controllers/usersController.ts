import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { User } from "../interfaces/user.interface";

export class UsersController {
  public static async login(req: Request, res: Response) {
    try {
      const params: Partial<User> = req.body;
      const service = new UsersService();
      const result = await service.login(params);
      if (result.status === "success") {
        res.cookie("token", result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set to true if using https
        });
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async register(req: Request, res: Response) {
    try {
      const params: User = req.body;
      const service = new UsersService();
      const user = await service.register(params);
      return res.status(200).send(user);
    } catch (error) {
      console.error("Error in register:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
