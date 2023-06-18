import { Field, InputType } from "@nestjs/graphql";

import { IsEmail, MaxLength, MinLength } from "class-validator";

@InputType()
export class LoginInput {
  @IsEmail()
  @Field({ nullable: false, description: "email for login", name: "email" })
  email: string;

  @MaxLength(10)
  @MinLength(5)
  @Field({
    nullable: false,
    description: "password for login",
    name: "password",
  })
  password: string;
}
