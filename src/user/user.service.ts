import { Injectable } from '@nestjs/common';
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
}
