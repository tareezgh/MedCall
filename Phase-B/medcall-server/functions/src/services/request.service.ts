import { RequestDal } from "../dal/request.dal";
import { IRequest } from "../interfaces/request.interface";

export class RequestService {
  private requestDal: RequestDal;

  constructor(requestDal: RequestDal = new RequestDal()) {
    this.requestDal = requestDal;
  }

  public async postRequest(request: IRequest) {
    if (
      !request.userId ||
      !request.location ||
      !request.callerName ||
      !request.phoneNumber ||
      !request.patientAge ||
      !request.emergencyType ||
      !request.consciousness ||
      !request.breathingStatus ||
      !request.bleeding ||
      !request.painLevel
    ) {
      return {
        status: "failure",
        message: "Please fill in all the fields.",
      };
    }
    const res = await this.requestDal.postRequest(request);
    return res;
  }
  
  public async getAllRequests() {
    const res = await this.requestDal.getAllRequests();
    return res;
  }

  public async getRequestsByUserId(userId: string) {
    const res = await this.requestDal.getRequestsByUserId(userId);
    return res;
  }

  public async getActiveRequest(data: { status: string; id: string }) {
    const res = await this.requestDal.getActiveRequest(data);
    return res;
  }

  public async getGuestRequest(data: { status: string; phoneNumber: string }) {
    const res = await this.requestDal.getGuestRequest(data);
    return res;
  }
  
  public async updateRequest(requestId: string, updateData: Partial<IRequest>) {
    const res = await this.requestDal.updateRequest(requestId, updateData);
    return res;
  }
}
