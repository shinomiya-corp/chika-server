import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GuildResolver } from './guild.resolver';
import { GuildService } from './guild.service';

@Module({
  providers: [GuildResolver, GuildService, PrismaService],
  exports: [GuildService],
})
export class GuildModule {}
