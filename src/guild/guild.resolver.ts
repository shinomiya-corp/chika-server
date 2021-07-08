import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => String, { description: 'The new prefix' })
  async updatePrefix(
    @Args('input', { type: () => UpdatePrefixInput })
    { guildId, prefix }: UpdatePrefixInput,
  ) {
    const res = await this.guildService.updatePrefix(guildId, prefix);
    return res.prefix;
  }
}
