import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserRepository } from '../user/user.repository';
import { UserDetailsRepository } from '../user-details/user-detail.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDetailsService } from '../user-details/user-details.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: '!learning' }),
    TypeOrmModule.forFeature([UserRepository, UserDetailsRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserDetailsService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
