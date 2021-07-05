import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { checkAdmin, CurrentUser } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import { UserInfo } from '../auth/lib/types';
import { CommandService } from './command.service';
import { ToggleCommandInput } from './dto/toggleCommandInput.dto';
import { Command } from './entities/command.entity';

@Resolver(() => Command)
export class CommandResolver {
  constructor(private readonly commandService: CommandService) {}

  @Query(() => [Command])
  getAllCommands() {
    return this.commandService.findAll();
  }

  @Query(() => [Command])
  @UseGuards(GqlAuthGuard)
  getDisabledCommands(
    @Args('guildId', { type: () => String }) guildId: string,
  ) {
    return this.commandService.findDisabled(guildId);
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
