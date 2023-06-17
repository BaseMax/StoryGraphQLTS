import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import AuthRepo from "./auth.repo";
import { MongooseModule } from "@nestjs/mongoose";
import userSchema, { User } from "src/models/user.model";
import { JwtModule } from "@nestjs/jwt";

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
    ]),
  ],
  providers: [AuthResolver, AuthService, AuthRepo],
})
export class AuthModule {}
