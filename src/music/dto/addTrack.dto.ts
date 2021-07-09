import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddTrackInput {
  @Field(() => ID)
  guildId: string;

  @Field(() => String)
  youtubeUrl: string;
}
