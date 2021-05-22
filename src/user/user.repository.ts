import { Repository, EntityRepository } from 'typeorm';
import { Res, HttpStatus } from '@nestjs/common';
import { User } from '../models/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserAuthCredentialsDto } from '../auth/dto/auth-credentials-dto';
import { hashPassword } from '../utils/hashPasswordUtils';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async SignUp(authCredentials: UserAuthCredentialsDto) {
    const { UserName, Password, Type } = authCredentials;

    const user = new User();

    user.UserName = UserName;
    user.Type = Type;
    const salt = await bcrypt.genSalt();
    user.Salt = salt;

    user.Password = await hashPassword(Password, salt);

    try {
      await user.save();
    } catch (err) {
      if (err.code === 23505) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
