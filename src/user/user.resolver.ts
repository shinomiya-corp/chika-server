import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/lib/current-user';
import { GqlAuthGuard } from '../auth/lib/guards';
import { UserInfo } from '../auth/lib/types';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: UserInfo) {
    return this.userService.getUser(user);
  }

  @Mutation(() => Boolean, {
    description: 'Returns true if logout was successful.',
  })
  @UseGuards(GqlAuthGuard)
  logout(@CurrentUser() user: UserInfo) {
    return this.userService.logout(user);
  }
}
