import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthCredentialsDto } from './dto/auth-credentials-dto';
import { LoginCredentialsDto } from './dto/login-credentials-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/signUp')
  userSignUp(@Body(ValidationPipe) authCredentailsDto: UserAuthCredentialsDto) {
    return this.authService.userSignUp(authCredentailsDto);
  }

  @Post('/user/login')
  userLogin(@Body(ValidationPipe) loginCredentials: LoginCredentialsDto) {
    return this.authService.userLogin(loginCredentials);
  }
}
