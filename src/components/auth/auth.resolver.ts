import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import ClientInformation from "src/decorator/clientInformation.decorator";
import { IResult } from "ua-parser-js";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login-auth.input";
import { RegisterInput } from "./dto/register-auth.input";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query("getGuestToken")
  async getGuestToken(@ClientInformation() cInformation: IResult) {
    return await this.authService.getGuestToken(cInformation);
  }

  @Mutation("isvalidGuestToken")
  async isvalidGuestToken(@Args("token") token: string) {
    return await this.authService.isvalidToken(token);
  }

  @Mutation("login")
  async login(@Args("loginInput") loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Mutation("register")
  async register(@Args("registerInput") registerInput: RegisterInput) {
    return await this.authService.register(registerInput);
  }
}

/*
 
  register(registerInput: {
    name: "mahdi"
    email: "yasermahdiazizzadeh@gmail.com"
    password: "azizzadeh"
  }) {
    id
    message
    created
    name
  }
  
  guestToken {
    accessToken
  }
*/
