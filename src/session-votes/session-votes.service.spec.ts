import { Test, TestingModule } from '@nestjs/testing';
import { SessionVotesService } from './session-votes.service';

describe('SessionVotesService', () => {
  let service: SessionVotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionVotesService],
    }).compile();

    service = module.get<SessionVotesService>(SessionVotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
