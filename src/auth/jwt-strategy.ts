import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';

export interface JwtPayload {
  UserName: string;
}

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

  async validate(payload: JwtPayload) {
    const { UserName } = payload;

    console.log(UserName);
  }

  async login(user: any) {
   
  //  const payload = { username: user.username, sub: user.userId };

    console.log(user)

    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
