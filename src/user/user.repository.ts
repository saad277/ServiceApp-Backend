import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserAuthCredentialsDto } from '../auth/dto/auth-credentials-dto';
import { LoginCredentialsDto } from '../auth/dto/login-credentials-dto';
import { hashPassword } from '../utils/hashPasswordUtils';
import { UserStatus } from './user.status.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async SignUp(authCredentials: UserAuthCredentialsDto) {
    const { UserName, Password, Email, Type, Contact } = authCredentials;

    const user = new User();

    user.UserName = UserName;
    user.Type = Type;
    user.Email = Email;
    user.Contact = Contact;
    const salt = await bcrypt.genSalt();
    user.Salt = salt;
    user.Password = await hashPassword(Password, salt);

    try {
      await user.save();
      return { Message: 'User Created Successfully' };
    } catch (err) {
      console.log(err);

      if (err.code == 23505) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(data, user: User) {
    if (data && Boolean(Object.keys(data).length)) {
      await this.createQueryBuilder('user')
        .update(User)
        .set({
          ...data,
          ...(user.Status === UserStatus.PendingVerification && {
            Status: UserStatus.Active,
          }),
        })
        .where('Id = :Id', { Id: user.Id })
        .execute();
    }

    const updatedUser = await this.getUser(user.Email);

    return { Message: 'User Profile Updated', User: updatedUser };
  }

  async getUser(Email: any): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.Email = :Email', { Email })
      .select([
        'user.Id',
        'user.UserName',
        'user.Email',
        'user.Type',
        'user.Contact',
        'user.Country',
        'user.City',
        'user.Language',
        'user.Location',
        'user.Age',
        'user.IsVendor',
        'user.ProfileImg',
        'user.Status',
      ])
      .getOne();

    return user;
  }

  async validateUserPassword(
    loginCredentials: LoginCredentialsDto,
  ): Promise<string> {
    const { Email, Password } = loginCredentials;

    const user = await this.findOne({ Email });

    if (user && (await user.validatePassword(Password))) {
      return user.Email;
    } else {
      return null;
    }
  }
}
