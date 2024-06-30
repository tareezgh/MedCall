const jwt = require("jsonwebtoken");
const functions = require("firebase-functions");
const bcrypt = require("bcrypt");
import { UsersDal } from "../dal/users.dal";
import {
  LoginFailureResult,
  LoginSuccessResult,
  User,
} from "../interfaces/user.interface";

type LoginResult = LoginSuccessResult | LoginFailureResult;

export class UsersService {
  private usersDal: UsersDal;

  constructor(usersDal: UsersDal = new UsersDal()) {
    this.usersDal = usersDal;
  }

  public async login(user: Partial<User>): Promise<LoginResult> {
    const JWT_SECRET = functions.config().jwt.secret_key;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const hashedPasswordFromDB = await this.usersDal.getUserPassword(user);
    if (!hashedPasswordFromDB)
      return { status: "failure", message: "User doesn't exist!!" };
    const passwordMatch = await bcrypt.compare(
      user.password,
      hashedPasswordFromDB
    );
    if (!passwordMatch) {
      return { status: "failure", message: "Incorrect email or password" };
    }
    const userData = await this.usersDal.getUserData(user);
    if (!userData) {
      return { status: "failure", message: "User data not found" };
    }
    // Create a JWT token
    const token = jwt.sign(
      {
        id: userData._id,
        email: user.email,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return {
      status: "success",
      message: "User logged in",
      token,
    };
  }

  public async register(user: User) {
    const saltRounds = 10;
    const isUserExist = await this.usersDal.checkUser(user);
    if (isUserExist)
      return { status: "failure", message: "Email already used!" };

    bcrypt.hash(user.password, saltRounds, async (err: any, hash: any) => {
      user["password"] = hash;
      const respond = await this.usersDal.createUser(user);
      return respond;
    });
    return { status: "failure", message: "Error" };
  }

  public async getUsers() {
    const res = await this.usersDal.findAll();
    return res;
  }
}
