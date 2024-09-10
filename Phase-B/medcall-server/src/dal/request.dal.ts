import Request from "../db/models/requests";
import Users from "../db/models/users";
import { IRequest } from "../interfaces/request.interface";

export class RequestDal {
  public async postRequest(request: IRequest) {
    try {
      const newRequest = new Request({
        userId: request.userId,
        location: {
          address: request.location.address,
          lat: request.location.lat,
          long: request.location.long,
        },
        driverId: request.driverId,
        driverName: request.driverName,
        driverLocation: request.driverLocation
          ? {
              address: request.driverLocation.address || "",
              lat: request.driverLocation.lat || 0,
              long: request.driverLocation.long || 0,
            }
          : undefined,
        status: request.status || "starting",
        callerName: request.callerName,
        phoneNumber: request.phoneNumber,
        patientAge: request.patientAge,
        emergencyType: request.emergencyType,
        consciousness: request.consciousness,
        breathingStatus: request.breathingStatus,
        bleeding: request.bleeding,
        painLevel: request.painLevel,
        optionalAllergies: request.optionalAllergies,
        optionalMedications: request.optionalMedications,
        optionalActivities: request.optionalActivities,
      });

      const savedRequest = await newRequest.save();

      // Update user's requests array with the new request ID
      if (request.userId) {
        await Users.findByIdAndUpdate(
          request.userId,
          { $push: { requests: savedRequest._id } },
          { new: true, useFindAndModify: false }
        );
      }

      return savedRequest;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  public async getAllRequests() {
    try {
      const requests = await Request.find({ status: "starting" }).populate(
        "userId",
        "firstName lastName phoneNumber"
      );
      return requests;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  public async getActiveRequest(data: { status: string; id: string }) {
    try {
      const query: any = { status: data.status };

      if (data.id) {
        query.$or = [
          { userId: data.id },
          { driverName: new RegExp(`^${data.id}_`) },
        ];
      }

      const activeRequest = await Request.findOne(query).populate(
        "userId",
        "firstName lastName phoneNumber"
      );
      return activeRequest;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  public async getGuestRequest(data: { status: string; phoneNumber: string }) {
    try {
      const query: any = {
        userId: null,
        phoneNumber: data.phoneNumber,
        status: data.status,
      };

      const activeRequest = await Request.findOne(query).populate(
        "userId",
        "firstName lastName phoneNumber"
      );
      return activeRequest;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  public async getRequestsByUserId(userId: string) {
    try {
      const query = userId ? { userId } : {};
      const requests = await Request.find(query).populate(
        "userId",
        "firstName lastName phoneNumber"
      );
      return requests;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  public async updateRequest(requestId: string, updateData: Partial<IRequest>) {
    try {
      const updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedRequest;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  public findAll(query: any = null) {
    return Request.find(query);
  }
}
