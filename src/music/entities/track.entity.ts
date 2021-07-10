import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
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
