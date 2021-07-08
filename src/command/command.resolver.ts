import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { checkAdmin, CurrentUser } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import type { UserInfo } from '../auth/lib/types';
import { CommandService } from './command.service';
import { ToggleCommandInput } from './dto/toggleCommandInput.dto';
import { Command, CommandGuildCtx } from './entities/command.entity';

@Resolver(() => Command)
export class CommandResolver {
  constructor(private readonly commandService: CommandService) {}

  @Query(() => [Command])
  getAllCommands() {
    return this.commandService.findAll();
  }

  @Query(() => [CommandGuildCtx])
  @UseGuards(GqlAuthGuard)
  getCommandsUnderGuildCtx(
    @Args('guildId', { type: () => String }) guildId: string,
    @CurrentUser() user: UserInfo,
  ) {
    checkAdmin(user, guildId);
    return this.commandService.getCommandsUnderGuildCtx(guildId);
  }

  @Mutation(() => CommandGuildCtx)
  @UseGuards(GqlAuthGuard)
  async enableCommand(
    @Args('toggleCommandInput', { type: () => ToggleCommandInput })
    toggleCommandInput: ToggleCommandInput,
    @CurrentUser() user: UserInfo,
  ): Promise<CommandGuildCtx> {
    const { guildId, commandId } = toggleCommandInput;
    checkAdmin(user, guildId);
    const command = await this.commandService.enable(toggleCommandInput);
    return {
      ...command,
      disabled: false,
      id: `${guildId}:${commandId}`,
      commandId: command.id,
    };
  }

  @Mutation(() => CommandGuildCtx)
  @UseGuards(GqlAuthGuard)
  async disableCommand(
    @Args('toggleCommandInput', { type: () => ToggleCommandInput })
    toggleCommandInput: ToggleCommandInput,
    @CurrentUser() user: UserInfo,
  ): Promise<CommandGuildCtx> {
    const { guildId, commandId } = toggleCommandInput;
    checkAdmin(user, guildId);
    const command = await this.commandService.disable(toggleCommandInput);
    return {
      ...command,
      disabled: true,
      id: `${guildId}:${commandId}`,
      commandId: command.id,
    };
  }
}
