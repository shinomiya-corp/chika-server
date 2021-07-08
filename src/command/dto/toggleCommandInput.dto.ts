import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ToggleCommandInput {
  @Field(() => String)
  guildId!: string;

  @Field(() => Int)
  commandId!: number;
}
