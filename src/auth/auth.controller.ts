import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginCredentialsDto, UserAuthCredentialsDto } from './dto';
import { LoginBody, SignUpBody } from '../swagger';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { GetUser } from '../decorators/get-user.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignUpBody })
  @Post('/user/signUp')
  userSignUp(@Body(ValidationPipe) authCredentailsDto: UserAuthCredentialsDto) {
    return this.authService.userSignUp(authCredentailsDto);
  }

  @ApiBody({ type: LoginBody })
  @Post('/user/login')
  userLogin(@Body(ValidationPipe) loginCredentials: LoginCredentialsDto) {
    return this.authService.userLogin(loginCredentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/me')
  getMe(@GetUser() user) {
    return user;
  }
}
