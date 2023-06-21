import { Injectable } from "@nestjs/common";
import AuthRepo from "./auth.repo";
import { compareSync, hashSync } from "bcrypt";
import { RegisterInput } from "./dto/register-auth.input";
import { LoginInput } from "./dto/login-auth.input";
import { JwtService } from "@nestjs/jwt";
import { IResult } from "ua-parser-js";
import Iuser from "../interface/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private jwtService: JwtService,
  ) {}

  private hashData(data: string | Buffer) {
    return hashSync(data, 8);
  }

  private compareData(data: string | Buffer, enc: string) {
    return compareSync(data, enc);
  }

  private createJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  public async register({ email, name, password }: RegisterInput) {
    const isuserExists = await this.authRepo.findOneByEmail(email);
    if (isuserExists)
      return {
        created: false,
        message: "user exists with this email",
      };

    const newPassword = this.hashData(password);

    const newUser = await this.authRepo.create({
      email,
      name,
      password: newPassword,
    });

    return {
      ...newUser,
      created: true,
      message: "your registration is successful",
    };
  }

  public async login({ email, password }: LoginInput) {
    const user = await this.authRepo.findOneByEmail(email);

    if (!user || !this.compareData(password, user.password))
      return {
        message: "email or password is wrong",
      };

    const payload = {
      id: user._id,
      isGuest: false,
    };
    const accessToken = this.createJwt(payload);

    return {
      accessToken,
      message: "login is successful",
    };
  }

  public async getGuestToken(cInformation: IResult) {
    const guestUser = await this.authRepo.createGuestUser(cInformation);
    const payload = {
      id: guestUser._id,
      isGuest: true,
    };
    const accessToken = this.createJwt(payload);
    return { accessToken };
  }

  public isvalidToken(t: string) {
    try {
      this.jwtService.verify(t) as Iuser;
      return {
        isvalid: true,
      };
    } catch {
      return {
        isvalid: false,
      };
    }
  }

  public async deleteAccount(user: { id: string; isGuest?: boolean }) {
    return await this.authRepo.deleteUser(user.id, user.isGuest);
  }
}
