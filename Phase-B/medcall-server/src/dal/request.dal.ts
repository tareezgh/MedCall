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
        driverName: request.driverName,
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
      console.error(err);
      throw err;
    }
  }

  public findAll(query: any = null) {
    return Request.find(query);
  }
}
