import { Repository, EntityRepository, Entity } from 'typeorm';
import { UserDetails } from '../entities/user.details.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(UserDetails)
export class UserDetailsRepository extends Repository<UserDetails> {
  async createEntry(userId) {
    const userDetails = new UserDetails();
    userDetails.UserId = userId;

    await userDetails.save();

    return { Status: 200, Message: 'Profile Created Successfully' };
  }
}
