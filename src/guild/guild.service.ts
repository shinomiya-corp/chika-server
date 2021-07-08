import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { PrismaService } from '../database/prisma.service';
import { SimpleGuild } from '../discord/lib/types';

@Injectable()
export class GuildService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  // deprecated
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

  async validateGuilds(old: SimpleGuild[]) {
    const current = await this.weAreInGuilds();
    return old.map((guild) => ({
      ...guild,
      isChikaIn: current.includes(guild.id),
    }));
  }
}
