import { Injectable, Inject } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { REPOSITORIES } from 'src/constants';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @Inject(REPOSITORIES.SESSIONS)
    private sessionsRepository: Repository<Session>,
  ) {}

  create(createSessionDto: CreateSessionDto) {
    return this.sessionsRepository.save(createSessionDto);
  }

  findAll() {
    return this.sessionsRepository.find();
  }

  findOne(id: string) {
    return this.sessionsRepository.findOne({ where: { id } });
  }

  update(updateSessionDto: UpdateSessionDto) {
    return this.sessionsRepository.save(updateSessionDto);
  }

  remove(session: Session) {
    return this.sessionsRepository.remove(session);
  }
}
