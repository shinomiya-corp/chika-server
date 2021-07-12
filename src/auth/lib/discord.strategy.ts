import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'guilds'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    ...args: any[]
  ) {
    const { username, discriminator, avatar, id } = profile;
    console.log({ profile });
    console.log(args);
    return this.authService.validateUser({
      id,
      username,
      discriminator,
      avatar: avatar || '',
      accessToken,
      refreshToken,
    });
  }
}
