import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import { forUser } from '../database/lib/redis-prefixes';
import { DiscordService } from '../discord/discord.service';
import type { DiscordUserInfo, UserInfo } from './lib/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
    private readonly discordService: DiscordService,
  ) {}

  async validateUser(details: DiscordUserInfo): Promise<UserInfo> {
    const { accessToken } = details;
    // get the admin guilds
    const guilds = await this.discordService.getAdminGuilds(accessToken);
    const client = this.redis.getClient('server');
    // store everything in redis
    client.set(
      forUser(details.id),
      JSON.stringify({ ...details, guilds }),
      'px',
      3600000 * 24,
    );
    return { ...details, guilds };
  }

  login(user: any) {
    // generates jwt
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
