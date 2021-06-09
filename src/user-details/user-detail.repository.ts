import { Repository, EntityRepository, Entity } from 'typeorm';
import { UserDetails } from '../entities/user.details.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(UserDetails)
export class UserDetailsRepository extends Repository<UserDetails> {
  async createEntry(userId) {
    const userDetails = new UserDetails();
    userDetails.UserId = userId;

    try {
      await userDetails.save();
      return { Status: 200, Message: 'Profile Created Successfully' };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateProfile(body, user) {
    if (body && Boolean(Object.keys(body).length)) {
      await this.createQueryBuilder('user_details')
        .update(UserDetails)
        .set({
          ...body,
        })
        .where('UserId = :UserId', { UserId: user.Id })
        .execute();
    }

    return { Message: 'User Profile Updated' };
  }

  async getDetails(userId) {
    const details = await this.createQueryBuilder('user_details')
      .where('user_details.UserId = :UserId', { UserId: userId })
      .getOne();

    return details;
  }
}
