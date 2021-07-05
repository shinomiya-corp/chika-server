import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import { CommandService } from './command.service';
import { Command } from './entities/command.entity';

@Resolver(() => Command)
export class CommandResolver {
  constructor(private readonly commandService: CommandService) {}

  @Query(() => [Command])
  @UseGuards(GqlAuthGuard)
  getAllCommands(@CurrentUser() user: any) {
    console.log({ user });
    return this.commandService.findAll();
  }

  // @Mutation(() => Command)
  // enableCommand(
  //   @Args('toggleCommandInput', { type: () => ToggleCommandInput })
  //   toggleCommandInput: ToggleCommandInput,
  // ) {
  //   this.commandService.enable(toggleCommandInput);
  // }

  // @Mutation(() => Command)
  // disableCommand(
  //   @Args('toggleCommandInput', { type: () => ToggleCommandInput })
  //   toggleCommandInput: ToggleCommandInput,
  // ) {
  //   this.commandService.disable(toggleCommandInput);
  // }
}
