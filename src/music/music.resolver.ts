import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { throwIfNotAdmin, CurrentUser } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import { UserInfo } from '../auth/lib/types';
import { AddTrackInput } from './dto/addTrack.dto';
import { RemoveTrackInput } from './dto/removeTrack.dto';
import { Track } from './entities/track.entity';
import { MusicService } from './music.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class MusicResolver {
  constructor(private readonly musicService: MusicService) {}

  @Query(() => [Track])
  getTracks(
    @Args('guildId', { type: () => ID }) guildId: string,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, guildId);
    return this.musicService.getTracks(guildId);
  }

  @Mutation(() => Track)
  addTrack(
    @Args('input', { type: () => AddTrackInput }) input: AddTrackInput,
    @CurrentUser() user: UserInfo,
  ): Promise<Track> {
    throwIfNotAdmin(user, input.guildId);
    return this.musicService.addTrack(input);
  }

  @Mutation(() => Int, { description: 'Returns the number of tracks removed.' })
  removeTrack(
    @Args('input', { type: () => RemoveTrackInput }) input: RemoveTrackInput,
    @CurrentUser() user: UserInfo,
  ): Promise<number> {
    throwIfNotAdmin(user, input.guildId);
    return this.musicService.removeTrack(input);
  }

  @Mutation(() => [Track])
  shuffleTracks(
    @Args('guildId', { type: () => ID }) guildId: string,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, guildId);
    return this.musicService.shuffle(guildId);
  }

  @Query(() => Track, { nullable: true })
  getNowPlaying(
    @Args('guildId', { type: () => ID }) guildId: string,
    @CurrentUser() user: UserInfo,
  ) {
    throwIfNotAdmin(user, guildId);
    return this.musicService.getNowPlaying(guildId);
  }
}
