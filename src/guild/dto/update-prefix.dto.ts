import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePrefixInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  prefix: string;
}
