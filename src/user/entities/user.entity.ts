import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { UserInfo } from '../../auth/lib/types';
import type { SimpleGuild } from '../../discord/lib/types';
import { Guild } from '../../guild/entities/guild.entity';

type SimpleUser = Pick<UserInfo, 'id' | 'username' | 'avatar' | 'guilds'>;

@ObjectType()
export class User implements SimpleUser {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  avatar!: string;

  @Field(() => [Guild])
  guilds!: SimpleGuild[];
}
