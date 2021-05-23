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

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async SignUp(authCredentials: UserAuthCredentialsDto) {
    const {
      UserName,
      Password,
      Email,
      Type,
      Age,
      Location,
      Contact,
      Language,
      Country,
      City,
      ProfileImg,
    } = authCredentials;

    const user = new User();

    user.UserName = UserName;
    user.Type = Type;
    user.Email = Email;
    user.Age = Age;
    user.Location = Location;
    user.Contact = Contact;
    user.Language = Language;
    user.Country = Country;
    user.City = City;
    user.ProfileImg = ProfileImg;

    const salt = await bcrypt.genSalt();
    user.Salt = salt;

    user.Password = await hashPassword(Password, salt);

    try {
      await user.save();
      return { Message: 'User Created Successfully' };
    } catch (err) {
      console.log(err);

      if (err.code === 23505) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(Email: any): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.Email = :Email', { Email })
      .select(['user.Id', 'user.UserName', 'user.Email', 'user.Type'])
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
