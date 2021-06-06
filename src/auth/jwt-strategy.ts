import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDetails } from 'src/entities/user.details.entity';
import { UserRoles } from 'src/user/user.roles.enum';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '!learning',
    });
  }

  async validate(Email: any) {
    const user = await this.userRepository.findOne({ Email });

    if (user.Type === UserRoles.Customer) {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.Email = :Email', { Email })
        .select([
          'user.Id',
          'user.UserName',
          'user.Email',
          'user.Type',
          'user.Contact',
          'user.Status',
        ])
        .leftJoinAndSelect('user.Details', 'Details')
        .getOne();

      return user;
    }

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    return user;
  }
}
