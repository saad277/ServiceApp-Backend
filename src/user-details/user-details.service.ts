import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetailsRepository } from './user-detail.repository';
import { UserDetails } from '../entities/user.details.entity';
import { UpdateUserProfileDto } from '../user/dto/update-user-profile-dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetailsRepository)
    private userDetailsRepository: UserDetailsRepository,
  ) {}

  async createEntry(userId) {
    return this.userDetailsRepository.createEntry(userId);
  }

  async updateProfile(body: UpdateUserProfileDto, user: User) {
    return this.userDetailsRepository.updateProfile(body, user);
  }
}
