import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DiscordModule } from '../discord/discord.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './lib/discord.strategy';
import { JwtStrategy } from './lib/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    DiscordModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy, JwtStrategy],
})
export class AuthModule {}
