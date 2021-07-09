import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Track } from './entities/track.entity';
import { MusicService } from './music.service';

@Resolver()
export class MusicResolver {
  constructor(private readonly musicService: MusicService) {}

  @Query(() => [Track])
  getTracks(@Args('guildId', { type: () => ID }) guildId: string) {
    return this.musicService.getTracks(guildId);
  }
}
