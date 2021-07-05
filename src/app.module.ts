import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CommandModule } from './command/command.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from 'nestjs-redis';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CommandModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: true,
    }),
    RedisModule.register([
      { name: 'bot', url: process.env.BOT_REDIS_URL },
      { name: 'server', url: process.env.SERVER_REDIS_URL },
    ]),
    PassportModule.register({ session: false }),
  ],
})
export class AppModule {}
