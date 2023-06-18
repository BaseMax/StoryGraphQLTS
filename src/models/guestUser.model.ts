import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import type {
  IBrowser,
  ICPU,
  IDevice,
  IEngine,
  IOS,
  IResult,
} from "ua-parser-js";

type GuestUserDocument = HydratedDocument<GuestUser>;

@Schema({
  validateBeforeSave: false,
})
class GuestUser {
  @Prop({
    type: String,
    required: true,
  })
  ua: string;

  @Prop({
    type: Object,
    required: true,
  })
  browser: IBrowser;

  @Prop({
    type: Object,
    required: true,
  })
  device: IDevice;

  @Prop({
    type: Object,
    required: true,
  })
  engine: IEngine;

  @Prop({
    type: Object,
    required: true,
  })
  os: IOS;

  @Prop({
    type: Object,
    required: true,
  })
  cpu: ICPU;
}

const guestUserSchema = SchemaFactory.createForClass(GuestUser);

export { guestUserSchema, GuestUser, GuestUserDocument };
