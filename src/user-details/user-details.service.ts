import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetailsRepository } from './user-detail.repository';
import { UserDetails } from '../entities/user.details.entity';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetailsRepository)
    private userDetailsRepository: UserDetailsRepository,
  ) {}

  async createEntry(userId) {
    return this.userDetailsRepository.createEntry(userId);
  }
}
