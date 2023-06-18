import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type GuestUserDocument = HydratedDocument<GuestUser>;

@Schema({
  validateBeforeSave: false,
})
class GuestUser {
  @Prop({
    type: String,
  })
  token: string;

  @Prop({
    type: String,
  })
  operationSystem: string;

  @Prop({
    type: String,
  })
  userAgent: string;

  @Prop({
    type: String,
  })
  displayDetails: string;

  @Prop({
    type: Number,
  })
  versionNumber: number;
}

const guestUserSchema = SchemaFactory.createForClass(GuestUser);

export { guestUserSchema, GuestUser, GuestUserDocument };
