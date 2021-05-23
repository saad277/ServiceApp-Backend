import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserAuthCredentialsDto } from './dto/auth-credentials-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/login-credentials-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async userSignUp(authCredentailsDto: UserAuthCredentialsDto) {
    return this.userRepository.SignUp(authCredentailsDto);
  }

  async userLogin(loginCredentials: LoginCredentialsDto) {
    console.log('authService', loginCredentials);
  }
}
