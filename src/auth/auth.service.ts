import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserAuthCredentialsDto } from './dto/auth-credentials-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/login-credentials-dto';
import { redis } from '../redis';
import { randomInteger } from '../utils/generateRandomCode';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async userSignUp(authCredentailsDto: UserAuthCredentialsDto) {
    return this.userRepository.SignUp(authCredentailsDto);
  }

  async userLogin(loginCredentials: LoginCredentialsDto) {
    const Email = await this.userRepository.validateUserPassword(
      loginCredentials,
    );

    if (!Email) {
      throw new UnauthorizedException('Unauthorized Exception');
    }

    const accessToken = await this.jwtService.sign(Email);

    return { Token: accessToken };
  }

  async setVerifyCode(userId) {
    let verifyCode = randomInteger(4);
    redis.set(userId, verifyCode, 'ex', 60);
    return { Message: 'Verification Code Sent' };
  }

  async confirmVerifyCode(userId, verifyCode) {
    let storedCode = await redis.get(userId);

    if (Boolean(verifyCode == storedCode)) {
      return { Message: 'Verification SuccessFul' };
    }

    throw new NotFoundException('Invalid or Expired Verification Code');
  }
}
