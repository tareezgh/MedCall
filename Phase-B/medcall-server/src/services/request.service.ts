import { RequestDal } from "../dal/request.dal";
import { IRequest } from "../interfaces/request.interface";

export class RequestService {
  private requestDal: RequestDal;

  constructor(requestDal: RequestDal = new RequestDal()) {
    this.requestDal = requestDal;
  }

  public async postRequest(request: IRequest) {
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

  public async updateRequest(requestId: string, updateData: Partial<IRequest>) {
    const res = await this.requestDal.updateRequest(requestId, updateData);
    return res;
  }
}
