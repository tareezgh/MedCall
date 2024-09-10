import request from "supertest";
import express from "express";
import { UsersController } from "../src/controllers/usersController";
import { UsersService } from "../src/services/users.service";
import mongoose from "mongoose";

jest.mock("../src/services/users.service");

const app = express();
app.use(express.json());
app.post("/login", UsersController.login);
app.post("/register", UsersController.register);
app.patch("/drivers/:id", UsersController.editDriverData);

describe("User API", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Login API", () => {
    it("should login successfully with correct credentials", async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        status: "success",
        message: "User logged in",
        token: "mocked-token",
      });
      (UsersService.prototype.login as jest.Mock) = mockLogin;

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("User logged in");
      expect(response.body.token).toBe("mocked-token");
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token=mocked-token");
    });

    it("should fail login with empty input", async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Please provide both email and password.",
      });
      (UsersService.prototype.login as jest.Mock) = mockLogin;

      const response = await request(app).post("/login").send({});

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe(
        "Please provide both email and password."
      );
    });

    it("should fail login with invalid credentials", async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Incorrect password. Please try again.",
      });
      (UsersService.prototype.login as jest.Mock) = mockLogin;

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrongPassword" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe(
        "Incorrect password. Please try again."
      );
    });

    it("should fail login with unregistered email", async () => {
      const mockLogin = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Email not found. Please check your email or sign up.",
      });
      (UsersService.prototype.login as jest.Mock) = mockLogin;

      const response = await request(app)
        .post("/login")
        .send({ email: "unregistered@example.com", password: "somePassword" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe(
        "Email not found. Please check your email or sign up."
      );
    });

    it("should handle internal server error", async () => {
      const mockLogin = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      (UsersService.prototype.login as jest.Mock) = mockLogin;

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Internal server error");
    });
  });

  describe("Register API", () => {
    it("should register successfully with valid input data", async () => {
      const mockRegister = jest.fn().mockResolvedValue({
        status: "success",
        message: "User registered",
        token: "mocked-token",
      });
      (UsersService.prototype.register as jest.Mock) = mockRegister;

      const response = await request(app).post("/register").send({
        email: "newuser@example.com",
        password: "ValidPass123",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("User registered");
      expect(response.body.token).toBe("mocked-token");
    });

    it("should fail registration with empty input", async () => {
      const mockRegister = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Please fill in all the fields.",
      });
      (UsersService.prototype.register as jest.Mock) = mockRegister;

      const response = await request(app).post("/register").send({});

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe("Please fill in all the fields.");
    });

    it("should fail registration with invalid email format", async () => {
      const mockRegister = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Please enter a valid email.",
      });
      (UsersService.prototype.register as jest.Mock) = mockRegister;

      const response = await request(app).post("/register").send({
        email: "invalidemail",
        password: "ValidPass123",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe("Please enter a valid email.");
    });

    it("should fail registration with weak password", async () => {
      const mockRegister = jest.fn().mockResolvedValue({
        status: "failure",
        message:
          "Password must be at least 8 characters with uppercase, lowercase, and number.",
      });
      (UsersService.prototype.register as jest.Mock) = mockRegister;

      const response = await request(app).post("/register").send({
        email: "newuser@example.com",
        password: "weak",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe(
        "Password must be at least 8 characters with uppercase, lowercase, and number."
      );
    });

    it("should fail registration with already registered email", async () => {
      const mockRegister = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Email already in use. Please choose another.",
      });
      (UsersService.prototype.register as jest.Mock) = mockRegister;

      const response = await request(app).post("/register").send({
        email: "existing@example.com",
        password: "ValidPass123",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("failure");
      expect(response.body.message).toBe(
        "Email already in use. Please choose another."
      );
    });
  });

  describe("Accept/Decline/Edit Drivers API", () => {
    it("should accept driver request with valid information", async () => {
      const userId = new mongoose.Types.ObjectId();
      const updateData = {
        driverStatus: "accepted",
      };

      const mockUpdateStatus = jest.fn().mockResolvedValue({
        status: "success",
        message: "Driver request accepted successfully",
      });
      (UsersService.prototype.editDriverData as jest.Mock) = mockUpdateStatus;

      const response = await request(app)
        .patch(`/drivers/${userId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Driver request accepted successfully",
      });
      expect(mockUpdateStatus).toHaveBeenCalledWith(userId.toString(), {
        driverStatus: "accepted",
      });
    });

    it("should decline driver request with valid information", async () => {
      const userId = new mongoose.Types.ObjectId();
      const updateData = {
        driverStatus: "declined",
      };

      const mockUpdateStatus = jest.fn().mockResolvedValue({
        status: "success",
        message: "Driver request declined successfully",
      });
      (UsersService.prototype.editDriverData as jest.Mock) = mockUpdateStatus;

      const response = await request(app)
        .patch(`/drivers/${userId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Driver request declined successfully",
      });
      expect(mockUpdateStatus).toHaveBeenCalledWith(userId.toString(), {
        driverStatus: "declined",
      });
    });

    it("should update driver information with valid input data", async () => {
      const userId = new mongoose.Types.ObjectId();
      const updateData = {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@example.com",
        city: "New York",
        address: "123 Main St",
        zipCode: "10001",
      };

      const mockUpdateStatus = jest.fn().mockResolvedValue({
        status: "success",
        message: "Profile updated successfully",
      });
      (UsersService.prototype.editDriverData as jest.Mock) = mockUpdateStatus;

      const response = await request(app)
        .patch(`/drivers/${userId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Profile updated successfully",
      });
      expect(mockUpdateStatus).toHaveBeenCalledWith(
        userId.toString(),
        updateData
      );
    });

    it("should fail to update driver information with missing necessary fields", async () => {
      const userId = new mongoose.Types.ObjectId();
      const updateData = {
        // Missing required fields
      };

      const mockUpdateStatus = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Profile update failed",
      });
      (UsersService.prototype.editDriverData as jest.Mock) = mockUpdateStatus;

      const response = await request(app)
        .patch(`/drivers/${userId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "failure",
        message: "Profile update failed",
      });
    });

    it("should handle internal server error during driver data update", async () => {
      const userId = new mongoose.Types.ObjectId();
      const updateData = {
        firstName: "John",
        lastName: "Doe",
      };

      const mockUpdateStatus = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      (UsersService.prototype.editDriverData as jest.Mock) = mockUpdateStatus;

      const response = await request(app)
        .patch(`/drivers/${userId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});
