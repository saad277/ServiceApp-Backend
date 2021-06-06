import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsService } from './user-details.service';
import { UserDetailsRepository } from './user-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailsRepository])],
  providers: [UserDetailsService],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}
