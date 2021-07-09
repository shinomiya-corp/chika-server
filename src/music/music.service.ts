import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { forTracks } from '../database/lib/redis-prefixes';
import { v4 } from 'uuid';

@Injectable()
export class MusicService {
  constructor(private readonly redisService: RedisService) {}

  async getTracks(guildId: string) {
    const redis = this.redisService.getClient('bot');
    const _tracks = await redis.lrange(forTracks(guildId), 0, -1);
    const tracks = _tracks.map((_track) => ({
      ...JSON.parse(_track),
      id: v4(),
    }));
    return tracks;
  }
}
