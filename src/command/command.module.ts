import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CommandResolver } from './command.resolver';
import { CommandService } from './command.service';

@Module({
  providers: [CommandResolver, CommandService, PrismaService],
})
export class CommandModule {}
