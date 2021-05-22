import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserAuthCredentialsDto } from '../auth/dto/auth-credentials-dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async SignUp(authCredentials: UserAuthCredentialsDto) {
    const { UserName, Password, Type } = authCredentials;

    console.log('REPO');

    console.log(UserName, Password);
  }
}
