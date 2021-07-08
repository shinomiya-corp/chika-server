import { Injectable } from '@nestjs/common';
import { GuildService } from '../guild/guild.service';
import axios from './lib/axios';
import { Guild, SimpleGuild } from './lib/types';

@Injectable()
export class DiscordService {
  constructor(private readonly guildService: GuildService) {}

  async getAdminGuilds(accessToken: string): Promise<SimpleGuild[]> {
    const guilds: Guild[] = (
      await axios.get('/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
    const inGuilds = await this.guildService.weAreInGuilds();
    // filter out the ones in which the user is an admin
    return guilds
      .filter((guild) => guild.permissions & 8)
      .map(({ id, name, icon }) => ({
        id,
        name,
        icon,
        isChikaIn: inGuilds.includes(id),
      }));
  }
}
