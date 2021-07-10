import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CmdCategory } from '@prisma/client';
import { Argument } from './argument.entity';

registerEnumType(CmdCategory, { name: 'CommandCategory' });

@ObjectType()
export class Command {
  @Field(() => ID)
  id!: number | string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => CmdCategory)
  category!: CmdCategory;

  @Field(() => [String], { nullable: true })
  aliases?: string[];

  @Field(() => [Argument], { nullable: true })
  args?: Argument[];
}

@ObjectType()
export class CommandGuildCtx extends Command {
  @Field(() => ID, {
    description: 'This is a prefixed ID of the format {guildID}:{commandID}',
  })
  id: string;

  @Field(() => Int)
  commandId: number;

  @Field(() => Boolean)
  disabled: boolean;
}
