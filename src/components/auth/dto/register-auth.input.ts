import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field({ nullable: false, description: "email for register", name: "email" })
  email: string;

  @MaxLength(10, { message: "password cannot more then 10 character" })
  @MinLength(5, { message: "password cannot less then 5 character" })
  @IsString({ message: "please send password" })
  @Field({
    nullable: false,
    description: "password for register",
    name: "password",
  })
  password: string;

  @MaxLength(10, { message: "name cannot more then 10 character" })
  @MinLength(5, { message: "name cannot less then 3 character" })
  @IsString({ message: "please send name" })
  @Field({
    nullable: false,
    description: "name for register",
    name: "name",
  })
  name: string;
}
