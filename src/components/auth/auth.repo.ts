import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IuserSchema, User } from 'src/schema/user.schema';

@Injectable()
class AuthRepo {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
}

export default AuthRepo;
