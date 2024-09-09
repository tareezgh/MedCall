import request from "supertest";
import express from "express";
import { UsersController } from "../src/controllers/usersController";
import { UsersService } from "../src/services/users.service";

jest.mock("../src/services/users.service");

const app = express();
app.use(express.json());
app.post("/login", UsersController.login);
app.post("/register", UsersController.register);

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
});
