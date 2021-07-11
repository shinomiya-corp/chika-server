import { Command } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { forBlockedCommands } from '../database/lib/redis-prefixes';
import { PrismaService } from '../database/prisma.service';
import type { ToggleCommandInput } from './dto/toggleCommandInput.dto';
import type { CommandGuildCtx } from './entities/command.entity';

@Injectable()
export class CommandService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  redis = this.redisService.getClient('bot');

  findAll() {
    return this.prisma.command.findMany({ include: { args: true } });
  }

  async getCommandsUnderGuildCtx(guildId: string) {
    const allCommands = await this.prisma.command.findMany();
    const disabledCommands = await this.redis.smembers(
      forBlockedCommands(guildId),
    );
    const commands = allCommands.reduce<CommandGuildCtx[]>((acc, raw, i) => {
      const _i = disabledCommands.findIndex(
        (disabled) => disabled === raw.name,
      );
      const id = `${guildId}:${raw.id}`;
      acc[i] =
        _i === -1
          ? { ...raw, disabled: false, id, commandId: raw.id }
          : { ...raw, disabled: true, id, commandId: raw.id };
      return acc;
    }, allCommands as any);
    return commands;
  }

  async enable(toggleCommandInput: ToggleCommandInput) {
    const { guildId, commandName } = toggleCommandInput;
    this.redis.srem(forBlockedCommands(guildId), commandName);
    return this.prisma.command.findUnique({ where: { name: commandName } });
  }

  async disable(toggleCommandInput: ToggleCommandInput): Promise<Command> {
    const { guildId, commandName } = toggleCommandInput;
    await this.redis.sadd(forBlockedCommands(guildId), commandName);
    return this.prisma.command.findUnique({ where: { name: commandName } });
  }
}
