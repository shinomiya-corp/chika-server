import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { ToggleCommandInput } from './dto/toggleCommandInput.dto';
import type { CommandGuildCtx } from './entities/command.entity';

@Injectable()
export class CommandService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.command.findMany({ include: { args: true } });
  }

  async getCommandsUnderGuildCtx(guildId: string) {
    const allCommands = await this.prisma.command.findMany();
    const { disabledCommands } = await this.prisma.guild.findUnique({
      where: { guildId },
      select: { disabledCommands: true },
    });

    const commands = allCommands.reduce((acc, raw, i) => {
      const _i = disabledCommands.findIndex(
        (disabled) => disabled.id === raw.id,
      );
      acc[i] =
        _i === -1 ? { ...raw, disabled: false } : { ...raw, disabled: true };
      return acc;
    }, allCommands as CommandGuildCtx[]);
    return commands;
  }

  async enable(toggleCommandInput: ToggleCommandInput) {
    const { guildId, commandId } = toggleCommandInput;
    return this.prisma.command.update({
      where: { id: parseInt(commandId) },
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
      where: { id: parseInt(commandId) },
      data: {
        disabledGuilds: {
          connect: { guildId },
        },
      },
    });
  }
}
