import request from "supertest";
import express from "express";
import { RequestController } from "../src/controllers/requestController";
import { RequestService } from "../src/services/request.service";
import { IRequest } from "../src/interfaces/request.interface";
import mongoose from "mongoose";

jest.mock("../src/services/request.service");

const app = express();
app.use(express.json());
app.post("/request", RequestController.postRequest);
app.get("/request", RequestController.getAllRequests);
app.get("/request/:id", RequestController.getRequestByUserId);
app.patch("/request/:id", RequestController.updateRequest);

describe("Request API", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new request successfully", async () => {
    const mockRequest: IRequest = {
      userId: new mongoose.Types.ObjectId(),
      location: {
        address: "123 Main St",
        lat: 40.7128,
        long: -74.006,
      },
      status: "starting",
      callerName: "John Doe",
      phoneNumber: "1234567890",
      patientAge: 30,
      emergencyType: "Medical",
      consciousness: "Conscious",
      breathingStatus: "Normal",
      bleeding: "No",
      painLevel: "Moderate",
      optionalAllergies: "None",
      optionalMedications: "None",
      optionalActivities: "None",
      requestId: "",
      key: "",
      driverId: new mongoose.Types.ObjectId(),
      driverName: "",
      driverLocation: {
        address: "",
        lat: 0,
        long: 0,
      },
    };

    const mockPostRequest = jest.fn().mockResolvedValue({
      ...mockRequest,
      _id: new mongoose.Types.ObjectId(),
    });
    (RequestService.prototype.postRequest as jest.Mock) = mockPostRequest;

    const response = await request(app).post("/request").send(mockRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
    expect(response.body).toMatchObject({
      ...mockRequest,
      userId: mockRequest.userId.toString(),
      driverId: mockRequest.driverId.toString(), // Convert driverId to string
      _id: expect.any(String), // Expect _id to be a string
    });

    // Additional checks to ensure all ObjectIds are converted to strings
    expect(mongoose.Types.ObjectId.isValid(response.body.userId)).toBeTruthy();
    expect(
      mongoose.Types.ObjectId.isValid(response.body.driverId)
    ).toBeTruthy();
  });

  it("should fail to create a request with missing information", async () => {
    const incompleteRequest = {
      userId: new mongoose.Types.ObjectId(),
      // Missing other required fields
    };

    const mockPostRequest = jest.fn().mockResolvedValue({
      status: "failure",
      message: "Please fill in all the fields.",
    });

    (RequestService.prototype.postRequest as jest.Mock) = mockPostRequest;

    const response = await request(app)
      .post("/request")
      .send(incompleteRequest);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Please fill in all the fields.");
  });

  it("should get all requests successfully", async () => {
    const mockRequests = [
      {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        status: "starting",
        location: { address: "123 Main St", lat: 40.7128, long: -74.006 },
        callerName: "John Doe",
        phoneNumber: "1234567890",
        patientAge: 30,
        emergencyType: "Medical",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        status: "completed",
        location: { address: "456 Elm St", lat: 40.73, long: -73.995 },
        callerName: "Jane Smith",
        phoneNumber: "0987654321",
        patientAge: 45,
        emergencyType: "Trauma",
      },
    ];

    const mockGetAllRequests = jest.fn().mockResolvedValue(mockRequests);
    (RequestService.prototype.getAllRequests as jest.Mock) = mockGetAllRequests;

    const response = await request(app).get("/request");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      mockRequests.map((request) => ({
        ...request,
        _id: request._id.toString(),
        userId: request.userId.toString(),
      }))
    );
  });

  it("should update request successfully", async () => {
    const requestId = new mongoose.Types.ObjectId();
    const updateData = {
      status: "completed",
      driverId: new mongoose.Types.ObjectId(),
      driverName: "John Doe",
      driverLocation: {
        address: "789 Oak St",
        lat: 40.72,
        long: -74.0,
      },
      consciousness: "Conscious",
      breathingStatus: "Normal",
      bleeding: "No",
      painLevel: "Low",
    };

    const mockUpdatedRequest = {
      _id: requestId,
      ...updateData,
      userId: new mongoose.Types.ObjectId(),
      location: { address: "123 Main St", lat: 40.7128, long: -74.006 },
      callerName: "John Doe",
      phoneNumber: "1234567890",
      patientAge: 30,
      emergencyType: "Medical",
    };

    const mockUpdateRequest = jest.fn().mockResolvedValue(mockUpdatedRequest);
    (RequestService.prototype.updateRequest as jest.Mock) = mockUpdateRequest;

    const response = await request(app)
      .patch(`/request/${requestId.toString()}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...mockUpdatedRequest,
      _id: mockUpdatedRequest._id.toString(),
      userId: mockUpdatedRequest.userId.toString(),
      driverId: updateData.driverId.toString(),
    });
  });

  describe("Ambulance Request API", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should accept ambulance request with valid information", async () => {
      const requestId = new mongoose.Types.ObjectId();
      const driverId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();
      const updateData = {
        status: "accepted",
        driverId: driverId.toString(),
        driverName: "John Doe",
        driverLocation: {
          address: "789 Oak St",
          lat: 40.72,
          long: -74.0,
        },
      };

      const mockUpdatedRequest = {
        _id: requestId,
        ...updateData,
        userId: userId,
        location: { address: "123 Main St", lat: 40.7128, long: -74.006 },
        callerName: "Jane Smith",
        phoneNumber: "1234567890",
        patientAge: 30,
        emergencyType: "Medical",
      };

      const mockUpdateRequest = jest.fn().mockResolvedValue({
        status: "success",
        message: "Request accepted successfully",
        data: mockUpdatedRequest,
      });
      (RequestService.prototype.updateRequest as jest.Mock) = mockUpdateRequest;

      const response = await request(app)
        .patch(`/request/${requestId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Request accepted successfully",
        data: {
          ...mockUpdatedRequest,
          _id: mockUpdatedRequest._id.toString(),
          userId: mockUpdatedRequest.userId.toString(),
          driverId: updateData.driverId.toString(),
        },
      });
      expect(mockUpdateRequest).toHaveBeenCalledWith(
        requestId.toString(),
        updateData
      );
    });

    it("should decline ambulance request with valid information", async () => {
      const requestId = new mongoose.Types.ObjectId();
      const updateData = {
        status: "declined",
        driverId: undefined,
        driverName: undefined,
        driverLocation: undefined
      };

      const mockUpdateRequest = jest.fn().mockResolvedValue({
        status: "success",
        message: "Request declined successfully",
      });
      (RequestService.prototype.updateRequest as jest.Mock) = mockUpdateRequest;

      const response = await request(app)
        .patch(`/request/${requestId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Request declined successfully",
      });
      expect(mockUpdateRequest).toHaveBeenCalledWith(
        requestId.toString(),
        updateData
      );
    });

    it("should fail to accept invalid ambulance request", async () => {
      const invalidRequestId = new mongoose.Types.ObjectId();
      const driverId = new mongoose.Types.ObjectId();
      const updateData = {
        status: "accepted",
        driverId: driverId.toString(),
        driverName: "John Doe",
            // Note: driverLocation is not included here
    };


      const mockUpdateRequest = jest.fn().mockResolvedValue({
        status: "failure",
        message: "Invalid request",
      });
      (RequestService.prototype.updateRequest as jest.Mock) = mockUpdateRequest;

      const response = await request(app)
        .patch(`/request/${invalidRequestId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "failure",
        message: "Invalid request",
      });
    

      expect(mockUpdateRequest).toHaveBeenCalledWith(
        invalidRequestId.toString(),
        updateData
      );
    });

    it("should handle internal server error during request update", async () => {
      const requestId = new mongoose.Types.ObjectId();
      const updateData = {
        status: "accepted",
        driverId: new mongoose.Types.ObjectId(),
      };

      const mockUpdateRequest = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      (RequestService.prototype.updateRequest as jest.Mock) = mockUpdateRequest;

      const response = await request(app)
        .patch(`/request/${requestId.toString()}`)
        .send(updateData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});
