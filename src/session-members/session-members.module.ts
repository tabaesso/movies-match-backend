import { Module } from '@nestjs/common';
import { SessionMembersService } from './session-members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionMembers } from './entities/session-members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionMembers])],
  controllers: [],
  providers: [SessionMembersService],
  exports: [SessionMembersService],
})
export class SessionMembersModule {}
