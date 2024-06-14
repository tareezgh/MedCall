import Users from "../db/models/users";
import { User } from "../interfaces/user.interface";

export class UsersDal {
  public async createUser(user: User) {
    try {
      const newUser = new Users({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: user.password,
        role: user.role || "User",
        requests: user.requests || [],
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

  public async getUserRole(user: Partial<User>) {
    const data = await Users.findOne({
      email: user.email,
    });

    return data?.role;
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
}
