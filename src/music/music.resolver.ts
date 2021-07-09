import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/lib/guards';
import { AddTrackInput } from './dto/addTrack.dto';
import { RemoveTrackInput } from './dto/removeTrack.dto';
import { Track } from './entities/track.entity';
import { MusicService } from './music.service';

@Resolver()
export class MusicResolver {
  constructor(private readonly musicService: MusicService) {}

  @Query(() => [Track])
  @UseGuards(GqlAuthGuard)
  getTracks(@Args('guildId', { type: () => ID }) guildId: string) {
    return this.musicService.getTracks(guildId);
  }

  @Mutation(() => Track)
  @UseGuards(GqlAuthGuard)
  addTrack(
    @Args('input', { type: () => AddTrackInput }) input: AddTrackInput,
  ): Promise<Track> {
    return this.musicService.addTrack(input);
  }

  @Mutation(() => Int, { description: 'Returns the number of tracks removed.' })
  @UseGuards(GqlAuthGuard)
  removeTrack(
    @Args('input', { type: () => RemoveTrackInput }) input: RemoveTrackInput,
  ): Promise<number> {
    return this.musicService.removeTrack(input);
  }
}
