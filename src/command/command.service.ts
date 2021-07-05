import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { ToggleCommandInput } from './dto/toggleCommandInput.dto';

@Injectable()
export class CommandService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.command.findMany({ include: { args: true } });
  }

  async findDisabled(guildId: string) {
    const res = await this.prisma.guild.findUnique({
      where: { guildId },
      select: { disabledCommands: { include: { args: true } } },
    });
    return res.disabledCommands;
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
