import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInfo } from './types';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export function checkAdmin(user: UserInfo, guildId: string) {
  // throw an error if not authorized
  if (!user.guilds.find(({ id }) => id === guildId)) {
    throw new UnauthorizedException(
      'You are not authorized to edit this guild',
    );
  }
}
