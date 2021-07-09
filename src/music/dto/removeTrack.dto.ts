import { Field, ID, InputType } from '@nestjs/graphql';
import { Track } from '../entities/track.entity';

@InputType()
export class RemoveTrackInput {
  @Field(() => ID)
  guildId: string;

  @Field(() => Track)
  track: Track;
}
