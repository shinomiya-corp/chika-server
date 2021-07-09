import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CommandModule } from './command/command.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from 'nestjs-redis';
import { PassportModule } from '@nestjs/passport';
import { DiscordModule } from './discord/discord.module';
import { UserModule } from './user/user.module';
import { GuildModule } from './guild/guild.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    CommandModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: true,
      cors: {
        origin: process.env.WEB_CLIENT_URL,
        credentials: true,
      },
    }),
    RedisModule.register([
      { name: 'bot', url: process.env.BOT_REDIS_URL },
      { name: 'server', url: process.env.SERVER_REDIS_URL },
    ]),
    PassportModule.register({ session: false }),
    DiscordModule,
    GuildModule,
    MusicModule,
  ],
})
export class AppModule {}
