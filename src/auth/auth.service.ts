import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { forUser } from '../database/lib/redis-prefixes';
import { JwtService } from '@nestjs/jwt';

type UserInfo = {
  discordId: string;
  discriminator: string;
  username: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(details: UserInfo) {
    const client = await this.redis.getClient('server');
    client.set(
      forUser(details.discordId),
      JSON.stringify(details),
      'px',
      60000,
    );
    return details;
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.discordId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
