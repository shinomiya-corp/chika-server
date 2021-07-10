import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import { UserInfo } from '../auth/lib/types';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUser(@CurrentUser() user: UserInfo) {
    return this.userService.getUser(user);
  }

  @Mutation(() => Boolean, {
    description: 'Returns true if logout was successful.',
  })
  logout(@CurrentUser() user: UserInfo) {
    return this.userService.logout(user);
  }
}
