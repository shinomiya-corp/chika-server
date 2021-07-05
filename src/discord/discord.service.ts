import { Injectable } from '@nestjs/common';
import axios from './lib/axios';
import { Guild, SimpleGuild } from './lib/types';

@Injectable()
export class DiscordService {
  async getAdminGuilds(accessToken: string): Promise<SimpleGuild[]> {
    const guilds: Guild[] = (
      await axios.get('/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
    // filter out the ones in which the user is an admin
    return guilds
      .filter((guild) => guild.permissions & 8)
      .map(({ id, name, icon }) => ({ id, name, icon }));
  }
}
