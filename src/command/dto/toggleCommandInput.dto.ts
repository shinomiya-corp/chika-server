import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ToggleCommandInput {
  @Field(() => String)
  guildId!: string;

  @Field(() => String, {
    description: 'Name of the command. It should be unique.',
  })
  commandName!: string;
}
