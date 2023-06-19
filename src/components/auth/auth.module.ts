import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import AuthRepo from "./auth.repo";
import { MongooseModule } from "@nestjs/mongoose";
import userSchema, { User } from "../../models/user.model";
import { JwtModule } from "@nestjs/jwt";
import { GuestUser, guestUserSchema } from "../../models/guestUser.model";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: "1000s" },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: GuestUser.name,
        schema: guestUserSchema,
      },
    ]),
  ],
  providers: [AuthResolver, AuthService, AuthRepo],
})
export class AuthModule {}
