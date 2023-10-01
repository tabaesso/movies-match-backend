import { Test, TestingModule } from '@nestjs/testing';
import { SessionGenresService } from './session-genres.service';

describe('SessionGenresService', () => {
  let service: SessionGenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionGenresService],
    }).compile();

    service = module.get<SessionGenresService>(SessionGenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
