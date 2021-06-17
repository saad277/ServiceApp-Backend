import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';

@Injectable()
export class FacebookStrategy {
  constructor() {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: '2897112750618034',
          clientSecret: '85db37cfdb5f96da6f9caa89cea49ce8',
          fbGraphVersion: 'v3.0',
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = {};
          return done(null, user);
        },
      ),
    );
  }
}
