import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateShiritoriInput {
  @Field(() => ID, { description: "Guild's ID in Discord." })
  id: string;

  @Field(() => Int, { description: 'Hand size.', nullable: true })
  handSize?: number;

  @Field(() => Int, { description: 'Minimum length.', nullable: true })
  minLen?: number;
}

@InputType()
export class UpdateBalloonInput {
  @Field(() => ID, { description: "Guild's ID in Discord." })
  id: string;

  @Field(() => Int, { description: 'Minimum volume.', nullable: true })
  minVol?: number;

  @Field(() => Int, { description: 'Maximum volume.', nullable: true })
  maxVol?: number;
}
