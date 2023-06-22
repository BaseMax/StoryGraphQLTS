import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
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

  private generateMongoId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

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

  public async deleteUser(userId: string, isGuest: boolean) {
    const modelName = (isGuest ? "guestUserModel" : "userModel") as any;

    const { deletedCount } = await this[modelName].deleteOne({
      _id: this.generateMongoId(userId),
    });
    return {
      deleted: deletedCount >= 1 ? true : false,
    };
  }
}

export default AuthRepo;
