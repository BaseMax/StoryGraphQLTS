import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: false,
})
class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

const userSchema = SchemaFactory.createForClass(User);

export default userSchema;
export { UserDocument };
