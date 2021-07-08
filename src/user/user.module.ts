import { Module } from '@nestjs/common';
import { GuildModule } from '../guild/guild.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [GuildModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
