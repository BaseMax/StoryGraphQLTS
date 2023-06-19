import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GuestUser } from "../../models/guestUser.model";
import { IResult } from "ua-parser-js";
import { IuserSchema, User } from "../../models/user.model";

@Injectable()
class AuthRepo {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(GuestUser.name)
    private readonly guestUserModel: Model<GuestUser>,
  ) {}

  public async create(user: IuserSchema) {
    const { _id, email, name } = await this.userModel.create(user);
    return {
      id: _id,
      email,
      name,
    };
  }

  public async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  public async createGuestUser(cInformation: IResult) {
    const guestUser = await this.guestUserModel.create(cInformation);
    return guestUser;
  }
}

export default AuthRepo;
