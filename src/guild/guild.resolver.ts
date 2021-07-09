import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UpdateBalloonInput,
  UpdateShiritoriInput,
} from './dto/update-param.dto';
import { UpdatePrefixInput } from './dto/update-prefix.dto';
import { GuildConfig } from './entities/guild.entity';
import { GuildService } from './guild.service';

@Resolver()
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
  getGuildConfig(@Args('guildId', { type: () => ID }) guildId: string) {
    return this.guildService.getConfig(guildId);
  }

  @Mutation(() => GuildConfig)
  updatePrefix(
    @Args('input', { type: () => UpdatePrefixInput })
    { id, prefix }: UpdatePrefixInput,
  ) {
    return this.guildService.updatePrefix(id, prefix);
  }

  @Mutation(() => GuildConfig)
  updateShiritori(
    @Args('input', { type: () => UpdateShiritoriInput })
    input: UpdateShiritoriInput,
  ) {
    return this.guildService.updateShiritori(input);
  }

  @Mutation(() => GuildConfig)
  updateBalloon(
    @Args('input', { type: () => UpdateBalloonInput })
    input: UpdateBalloonInput,
  ) {
    return this.guildService.updateBalloon(input);
  }
}
