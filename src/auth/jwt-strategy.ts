import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
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
    console.log('payload-->', Email);

    const user = await this.userRepository.findOne({ Email });

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    console.log(user);
    return user;
  }
}
