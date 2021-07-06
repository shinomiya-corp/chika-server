import { SimpleGuild } from '../../discord/lib/types';

type DiscordUserInfo = {
  id: string;
  discriminator: string;
  username: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};

type UserInfo = DiscordUserInfo & { guilds: SimpleGuild[] };

export type { DiscordUserInfo, UserInfo };
