import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { PrismaService } from '../database/prisma.service';
import { SimpleGuild } from '../discord/lib/types';
import {
  UpdateBalloonInput,
  UpdateShiritoriInput,
} from './dto/update-param.dto';
import { GuildConfig } from './entities/guild.entity';
import {
  DEFAULT_MAX_BALLOON,
  DEFAULT_MIN_BALLOON,
  DEFAULT_PREFIX,
  DEFAULT_SHIRITORI_HAND,
  DEFAULT_SHIRITORI_MIN_LEN,
} from './lib/defaults';

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

  async getConfig(guildId: string): Promise<GuildConfig> {
    const guild = await this.prisma.guild.findUnique({
      where: { guildId },
      select: {
        prefix: true,
        shiritori: { select: { handSize: true, minLen: true } },
        balloon: { select: { minVol: true, maxVol: true } },
      },
    });
    if (!guild) return null;
    const { prefix, balloon, shiritori } = guild;
    return {
      id: guildId,
      prefix: prefix || DEFAULT_PREFIX,
      shiriHandSize: shiritori?.handSize || DEFAULT_SHIRITORI_HAND,
      shiriMinLen: shiritori?.minLen || DEFAULT_SHIRITORI_MIN_LEN,
      ballMinVol: balloon?.minVol || DEFAULT_MIN_BALLOON,
      ballMaxVol: balloon?.maxVol || DEFAULT_MAX_BALLOON,
    };
  }

  async updatePrefix(guildId: string, prefix: string): Promise<GuildConfig> {
    await this.prisma.guild.update({
      where: { guildId },
      data: { prefix },
    });
    return this.getConfig(guildId);
  }

  async updateShiritori(input: UpdateShiritoriInput): Promise<GuildConfig> {
    const { id: guildId, handSize, minLen } = input;
    await this.prisma.guild.update({
      where: { guildId },
      data: {
        shiritori: {
          // NOTE: we are using upsert!
          upsert: {
            update: { handSize, minLen },
            create: { handSize, minLen },
          },
        },
      },
    });
    return this.getConfig(guildId);
  }

  async updateBalloon(input: UpdateBalloonInput): Promise<GuildConfig> {
    const { id: guildId, minVol, maxVol } = input;
    await this.prisma.guild.update({
      where: { guildId },
      data: {
        balloon: {
          // NOTE: we are using upsert!
          upsert: {
            update: { minVol, maxVol },
            create: { minVol, maxVol },
          },
        },
      },
    });
    return this.getConfig(guildId);
  }
}
