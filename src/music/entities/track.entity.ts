import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  // we'll use uuidv4 for this
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  duration: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  thumbnailURL: string;
}
