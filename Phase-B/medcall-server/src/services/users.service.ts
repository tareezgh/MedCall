import { UsersDal } from "../dal/users.dal";
import { User } from "../interfaces/user.interface";

const bcrypt = require("bcrypt");

export class UsersService {
  private usersDal: UsersDal;

  constructor(usersDal: UsersDal = new UsersDal()) {
    this.usersDal = usersDal;
  }

  public async login(user: Partial<User>) {
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
    const userRole = await this.usersDal.getUserRole(user);

    return {
      status: "success",
      message: "User logged in",
      role: userRole,
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
  }

  public async getUsers() {
    const res = await this.usersDal.findAll();
    return res;
  }

}
