import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginCredentialsDto, UserAuthCredentialsDto } from './dto';
import { LoginBody, SignUpBody, VerifyCodeBody } from '../swagger';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { GetUser } from '../decorators/get-user.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('facebook-token'))
  // @Get('facebook')
  // async getTokenAfterFacebookSignIn(@Req() req) {
  //   console.log(req.user);
  // }

  @ApiBody({ type: SignUpBody })
  @Post('/user/signUp')
  userSignUp(@Body() authCredentailsDto: UserAuthCredentialsDto) {
    return this.authService.userSignUp(authCredentailsDto);
  }

  @ApiBody({ type: LoginBody })
  @Post('/user/login')
  userLogin(@Body() loginCredentials: LoginCredentialsDto) {
    return this.authService.userLogin(loginCredentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/verify/getCode')
  verify(@GetUser() user) {
    return this.authService.setVerifyCode(user.Id);
  }

  @ApiBody({ type: VerifyCodeBody })
  @UseGuards(JwtAuthGuard)
  @Post('/verify/confirmCode')
  verifyCode(@Body() body, @GetUser() user) {
    const { Code } = body;

    return this.authService.confirmVerifyCode(user, Code);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/me')
  getMe(@GetUser() user) {
    return user;
  }
}
