import { Injectable } from '@nestjs/common';
import { CreateSessionMemberDto } from './dto/create-session-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionMembers } from './entities/session-members.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class SessionMembersService {
  constructor(
    @InjectRepository(SessionMembers)
    private sessionMembersRepository: Repository<SessionMembers>,
  ) {}

  create(createSessionMemberDto: CreateSessionMemberDto) {
    return this.sessionMembersRepository.save({
      user_id: createSessionMemberDto.userId,
      session_id: createSessionMemberDto.sessionId,
    });
  }

  findBySession(sessionId: string) {
    return this.sessionMembersRepository.findBy({
      session_id: Equal(sessionId),
    });
  }

  findOne(sessionId: string, userId: string) {
    return this.sessionMembersRepository.findOne({
      where: {
        session_id: sessionId,
        user_id: userId,
        is_connected: true,
      },
    });
  }

  remove(sessionMember: SessionMembers) {
    return this.sessionMembersRepository.remove(sessionMember);
  }
}
