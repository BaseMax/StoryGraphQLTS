import { Field, InputType } from "@nestjs/graphql";

import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class LoginInput {
  @IsEmail()
  @Field({ nullable: false, description: "email for login", name: "email" })
  email: string;

  @MaxLength(10, { message: "password cannot more then 10 character" })
  @MinLength(5, { message: "password cannot less then 5 character" })
  @IsString({ message: "please send password" })
  @Field({
    nullable: false,
    description: "password for login",
    name: "password",
  })
  password: string;
}
