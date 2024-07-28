const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

import mongoose from "mongoose";
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
    const userData = await this.usersDal.getUserByEmail(user.email || "");
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

  public async sendOtp(email: string) {
    const user = await this.usersDal.getUserByEmail(email);
    if (!user) {
      return { status: "failure", message: "User not found" };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.usersDal.saveOtp(email, otp);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `MedCall Support`,
      to: email,
      subject: "MedCall OTP Code",
      html: `<p>Your OTP code for MedCall is <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

    return { status: "success", message: "OTP sent to email" };
  }

  public async verifyOtp(email: string, otp: string) {
    const isValidOtp = await this.usersDal.verifyOtp(email, otp);
    if (!isValidOtp) {
      return { status: "failure", message: "Invalid or expired OTP" };
    }
    return { status: "success", message: "OTP verified successfully" };
  }

  public async resetPassword(email: string, newPassword: string) {
    const user = await this.usersDal.getUserByEmail(email);
    if (!user) {
      return { status: "failure", message: "User not found" };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await this.usersDal.updateUserPassword(
      email,
      hashedPassword
    );

    if (updatedUser) {
      return { status: "success", message: "Password reset successfully" };
    } else {
      return { status: "failure", message: "Password reset failed" };
    }
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
