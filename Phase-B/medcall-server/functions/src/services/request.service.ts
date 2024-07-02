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
}
