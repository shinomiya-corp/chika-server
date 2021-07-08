import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GuildService } from './guild.service';

@Resolver()
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(() => Boolean, {
    description: 'Checks our database for this guild.',
  })
  hasChika(@Args('guildId', { type: () => String }) guildId: string) {
    return this.guildService.hasChika(guildId);
  }
}
