import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, throwIfNotAdmin } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import { UserInfo } from '../auth/lib/types';
import {
  UpdateBalloonInput,
  UpdateShiritoriInput,
} from './dto/update-param.dto';
import { UpdatePrefixInput } from './dto/update-prefix.dto';
import { GuildConfig } from './entities/guild.entity';
import { GuildService } from './guild.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(() => Boolean, {
    description: 'Checks our database for this guild.',
    deprecationReason:
      'We are syncing with the bot now, no need for this check',
  })
  hasChika(@Args('guildId', { type: () => ID }) guildId: string) {
    return this.guildService.hasChika(guildId);
  }

  @Query(() => GuildConfig)
  getGuildConfig(
    @Args('guildId', { type: () => ID }) guildId: string,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, guildId);
    return this.guildService.getConfig(guildId);
  }

  @Mutation(() => GuildConfig)
  updatePrefix(
    @Args('input', { type: () => UpdatePrefixInput })
    { id, prefix }: UpdatePrefixInput,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, id);
    return this.guildService.updatePrefix(id, prefix);
  }

  @Mutation(() => GuildConfig)
  updateShiritori(
    @Args('input', { type: () => UpdateShiritoriInput })
    input: UpdateShiritoriInput,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, input.id);
    return this.guildService.updateShiritori(input);
  }

  @Mutation(() => GuildConfig)
  updateBalloon(
    @Args('input', { type: () => UpdateBalloonInput })
    input: UpdateBalloonInput,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, input.id);
    return this.guildService.updateBalloon(input);
  }
}
