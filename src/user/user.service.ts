import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import type { UserInfo } from '../auth/lib/types';
import { forUser } from '../database/lib/redis-prefixes';
import type { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly redis: RedisService) {}

  async getUser(user: UserInfo): Promise<User> {
    const client = this.redis.getClient('server');
    const _user = await client.get(forUser(user.id));
    const { id, username, avatar, guilds } = JSON.parse(_user) as UserInfo;
    return { id, username, avatar, guilds };
  }
}
