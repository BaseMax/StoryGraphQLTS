import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field({ nullable: false, description: 'email for register', name: 'email' })
  email: string;

  @MaxLength(10)
  @MinLength(5)
  @Field({
    nullable: false,
    description: 'password for register',
    name: 'password',
  })
  password: string;

  @MaxLength(10)
  @MinLength(3)
  @Field({
    nullable: false,
    description: 'name for register',
    name: 'name',
  })
  name: string;
}
