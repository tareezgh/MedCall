import mongoose from "mongoose";
import Users from "../db/models/users";
import Request from "../db/models/requests";
import { User } from "../interfaces/user.interface";

export class UsersDal {
  public async createUser(user: User) {
    try {
      const newUser = new Users({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber || "",
        email: user.email,
        password: user.password,
        role: user.role || "user",
        requests: user.requests || [],
        city: user.city,
        address: user.address,
        zipCode: user.zipCode,
        driverStatus: user.driverStatus,
        isGoogleSignIn: user.isGoogleSignIn,
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getUserPassword(user: Partial<User>) {
    const data = await Users.findOne({
      email: user.email,
    });

    return data?.password;
  }

  public async updateGuestRequestUserId(
    phoneNumber: string,
    userId: mongoose.Types.ObjectId
  ) {
    try {
      const guestRequest = await Request.findOne({
        phoneNumber: phoneNumber,
        userId: null,
      });

      if (guestRequest) {
        // Update the request with the user's ID
        guestRequest.userId = userId;
        await guestRequest.save();
      }
    } catch (error) {
      console.error("Error updating guest request with userId:", error);
      throw error;
    }
  }

  
  public async checkUser(user: Partial<User>) {
    const data = await Users.findOne({
      email: user.email,
    });
    return data?.email === user.email;
  }

  public async updateUserAuth(user: Partial<User>) {
    const data = await Users.findOne({
      email: user.email,
    }).updateOne({ $set: { role: user.role } });
    return data;
  }

  public findAll(query: any = null) {
    return Users.find(query);
  }

  public async getUserByEmail(email: string) {
    try {
      return await Users.findOne({ email });
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }

  public async updateUserPassword(email: string, newPassword: string) {
    try {
      const result = await Users.updateOne(
        { email },
        { $set: { password: newPassword } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }

  public async editProfile(userId: string, updateData: Partial<User>) {
    try {
      const updatedData = await Users.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedData;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  public async editDriverData(userId: string, updateData: Partial<User>) {
    try {
      const updatedData = await Users.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedData;
    } catch (error) {
      console.error("Error updating driver data:", error);
      throw error;
    }
  }

  public async deleteDriver(userId: string) {
    try {
      const deletedUser = await Users.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.error("Error deleting driver:", error);
      throw error;
    }
  }

  public async saveOtp(email: string, otp: string) {
    try {
      const user = await Users.findOne({ email });
      if (user) {
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Set expiry for 5 minutes from now
        await user.save();
      }
    } catch (error) {
      console.error("Error saving OTP:", error);
      throw error;
    }
  }

  public async verifyOtp(email: string, otp: string) {
    try {
      const user = await Users.findOne({ email, otp });
      if (user && user.otpExpiry && user.otpExpiry > new Date()) {
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
}
