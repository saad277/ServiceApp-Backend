import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserDetailsService } from '../user-details/user-details.service';
import { UserDetailsRepository } from '../user-details/user-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserDetailsRepository])],
  controllers: [UserController],
  providers: [UserService, UserDetailsService],
})
export class UserModule {}
