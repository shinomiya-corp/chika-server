import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
export class GuildConfig {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  prefix: string;

  @Field(() => Int)
  shiriHandSize: number;

  @Field(() => Int)
  shiriMinLen: number;

  @Field(() => Int)
  ballMinVol: number;

  @Field(() => Int)
  ballMaxVol: number;
}
