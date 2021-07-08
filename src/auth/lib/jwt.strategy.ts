import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RedisService } from 'nestjs-redis';
import { Strategy } from 'passport-jwt';
import { forUser } from '../../database/lib/redis-prefixes';
import { cookieExtractor } from './cookies';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly redis: RedisService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('validate in jwt ran');
    const id = payload.sub;
    const redis = this.redis.getClient('server');
    // returns null if user is not found
    // we'll throw here
    const user = await redis.get(forUser(id));
    if (!user) throw new UnauthorizedException();
    // otherwise it should be a UserInfo object
    return JSON.parse(user);
  }
}
