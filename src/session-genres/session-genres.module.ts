import { Module } from '@nestjs/common';
import { SessionGenresService } from './session-genres.service';

@Module({
  controllers: [],
  providers: [SessionGenresService],
  exports: [SessionGenresService],
})
export class SessionGenresModule {}
