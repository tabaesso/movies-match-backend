import { Module } from '@nestjs/common';
import { SessionGenresService } from './session-genres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionGenres } from './entities/session-genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionGenres])],
  controllers: [],
  providers: [SessionGenresService],
  exports: [SessionGenresService],
})
export class SessionGenresModule {}
