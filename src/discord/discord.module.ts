import { Module } from '@nestjs/common';
import { GuildModule } from '../guild/guild.module';
import { DiscordService } from './discord.service';

@Module({
  imports: [GuildModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
