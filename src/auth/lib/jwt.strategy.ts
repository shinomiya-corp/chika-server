import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RedisService } from 'nestjs-redis';
import { Strategy } from 'passport-jwt';
import { forUser } from '../../database/lib/redis-prefixes';
import { cookieExtractor } from './cookies';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly redis: RedisService) {
    super({
      // TODO: change this to using cookie parsing
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const discordId = payload.sub;
    const redis = this.redis.getClient('server');
    const user = await redis.get(forUser(discordId));
    // returns null if user is not found
    // otherwise it should be a UserInfo object
    return JSON.parse(user);
  }
}
