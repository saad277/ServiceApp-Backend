import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDetailsRepository } from '../user-details/user-detail.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(UserDetailsRepository)
    private UserDetailsRepository: UserDetailsRepository,
  ) {}

  async getUser(user) {
    const foundUser = await this.userRepository.getUser(user);

    const Details = await this.UserDetailsRepository.getDetails(foundUser.Id);

    return { ...Details, ...foundUser };
  }

  async updateUser(id, payload) {
    const isExists = await this.userRepository.findOne(id);

    if (isExists) {
      try {
        await this.userRepository.update(id, payload);

        return { Message: 'User Status Updated', Status: 200 };
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }

    throw new NotFoundException();
  }
}
