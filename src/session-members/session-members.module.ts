import { Module } from '@nestjs/common';
import { SessionMembersService } from './session-members.service';

@Module({
  controllers: [],
  providers: [SessionMembersService],
  exports: [SessionMembersService],
})
export class SessionMembersModule {}
