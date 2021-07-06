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

  @Mutation(() => Command)
  @UseGuards(GqlAuthGuard)
  enableCommand(
    @Args('toggleCommandInput', { type: () => ToggleCommandInput })
    toggleCommandInput: ToggleCommandInput,
    @CurrentUser() user: UserInfo,
  ) {
    checkAdmin(user, toggleCommandInput.guildId);
    return this.commandService.enable(toggleCommandInput);
  }

  @Mutation(() => Command)
  @UseGuards(GqlAuthGuard)
  disableCommand(
    @Args('toggleCommandInput', { type: () => ToggleCommandInput })
    toggleCommandInput: ToggleCommandInput,
    @CurrentUser() user: UserInfo,
  ) {
    checkAdmin(user, toggleCommandInput.guildId);
    return this.commandService.disable(toggleCommandInput);
  }
}
