import jwt from "jsonwebtoken";
import { UsersDal } from "../dal/users.dal";
import mongoose from "mongoose";
const bcrypt = require("bcrypt");
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

  public async login(user: Partial<User> ): Promise<LoginResult> {
    if(!user.isGoogleSignIn){
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
    }
    const userData = await this.usersDal.getUserData(user);
    if (!userData) {
      return { status: "failure", message: "User data not found" };
    }

    const token = this.generateToken(
      userData._id,
      userData.email,
      userData.role,
      userData.firstName,
      userData.lastName,
      userData.phoneNumber
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

    if (!user.isGoogleSignIn) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }

    const newUser = await this.usersDal.createUser(user);
    if (!newUser) {
      return { status: "failure", message: "User registration failed" };
    }

    const token = this.generateToken(
      newUser._id,
      user.email,
      newUser.role,
      newUser.firstName,
      newUser.lastName,
      newUser.phoneNumber
    );

    return {
      status: "success",
      message: "User registered",
      token,
    };
  }

  public async getUsers() {
    const res = await this.usersDal.findAll();
    return res;
  }

  private generateToken(
    id: mongoose.Types.ObjectId,
    email: string,
    role: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string | null
  ) {
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        id: id,
        email: email,
        role: role,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
