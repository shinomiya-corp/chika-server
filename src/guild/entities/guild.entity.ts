import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SimpleGuild } from '../../discord/lib/types';

@ObjectType()
export class Guild implements SimpleGuild {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => Boolean)
  isChikaIn!: boolean;
}
