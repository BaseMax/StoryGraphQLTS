import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-auth.input';
import { RegisterInput } from './dto/register-auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Mutation('register')
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return await this.authService.register(registerInput);
  }
}
