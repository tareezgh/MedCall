export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  requests?: Array<any>;
}

export interface LoginSuccessResult {
  status: "success";
  message: string;
  role: string;
  token: string;
}

export interface LoginFailureResult {
  status: "failure";
  message: string;
}
