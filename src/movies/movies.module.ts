import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => {
        return {
          baseURL: process.env.MOVIES_DB_API_BASE_URL,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIES_DB_API_KEY}`,
          },
        };
      },
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
