import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class GuildService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async hasChika(guildId: string) {
    const res = await this.prisma.guild.findUnique({ where: { guildId } });
    if (!res) {
      await this.prisma.guild.create({ data: { guildId } });
    }
    return !!res;
  }

  async weAreInGuilds() {
    const client = this.redis.getClient('bot');
    const _guilds = await client.get('inGuilds');
    // an array of guild IDs
    const guilds: string[] = JSON.parse(_guilds);
    return guilds;
  }
}
