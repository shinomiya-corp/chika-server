import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
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
    const guild = await this.prisma.guild.findUnique({
      where: { guildId },
      select: { disabledCommands: true },
    });
    // guild here can be null but prisma doesn't type it
    if (!guild) await this.prisma.guild.create({ data: { guildId } });
    const disabledCommands = guild ? guild.disabledCommands : [];
    const commands = allCommands.reduce<CommandGuildCtx[]>((acc, raw, i) => {
      const _i = disabledCommands.findIndex(
        (disabled) => disabled.id === raw.id,
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
    const { guildId, commandId } = toggleCommandInput;
    return this.prisma.command.update({
      where: { id: commandId },
      data: {
        disabledGuilds: {
          disconnect: { guildId },
        },
      },
    });
  }

  async disable(toggleCommandInput: ToggleCommandInput) {
    const { guildId, commandId } = toggleCommandInput;
    return this.prisma.command.update({
      where: { id: commandId },
      data: {
        disabledGuilds: {
          connect: { guildId },
        },
      },
    });
  }
}
