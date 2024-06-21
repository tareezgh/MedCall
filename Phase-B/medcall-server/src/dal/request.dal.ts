import Request from "../db/models/requests";
import { IRequest } from "../interfaces/request.interface";

export class RequestDal {
  public async postRequest(request: IRequest) {
    try {
      const newRequest = new Request({
        callerName: request.callerName,
        phoneNumber: request.phoneNumber,
        patientAge: request.patientAge,
        emergencyType: request.emergencyType,
        consciousness: request.consciousness,
        breathingStatus: request.breathingStatus,
        bleeding: request.bleeding,
        painLevel: request.painLevel,
      });

      const savedRequest = await newRequest.save();
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
