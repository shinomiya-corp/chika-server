import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import { forUser } from '../database/lib/redis-prefixes';
import { DiscordService } from '../discord/discord.service';
import { DiscordUserInfo } from './lib/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
    private readonly discordService: DiscordService,
  ) {}

  async validateUser(details: DiscordUserInfo) {
    const { accessToken } = details;
    // get the admin guilds
    const guilds = await this.discordService.getAdminGuilds(accessToken);
    const client = this.redis.getClient('server');
    // store everything in redis
    client.set(
      forUser(details.discordId),
      JSON.stringify({ ...details, guilds }),
      'px',
      3600000,
    );
    return details;
  }

  login(user: any) {
    // generates jwt
    const payload = { username: user.username, sub: user.discordId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
