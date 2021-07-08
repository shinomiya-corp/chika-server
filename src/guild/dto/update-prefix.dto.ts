import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePrefixInput {
  @Field(() => ID)
  guildId: string;

  @Field(() => String)
  prefix: string;
}
