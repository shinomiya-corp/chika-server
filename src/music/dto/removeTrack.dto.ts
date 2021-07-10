import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveTrackInput {
  @Field(() => ID)
  guildId: string;

  @Field(() => String)
  trackId: string;
}
