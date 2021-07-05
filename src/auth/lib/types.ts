import { SimpleGuild } from '../../discord/lib/types';

type DiscordUserInfo = {
  discordId: string;
  discriminator: string;
  username: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};

type UserInfo = DiscordUserInfo & { guilds: SimpleGuild[] };

export type { DiscordUserInfo, UserInfo };
