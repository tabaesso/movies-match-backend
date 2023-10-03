import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(
    @Query('mediaType') mediaType?: string,
    @Query('genres') genres?: string,
    @Query('page') page?: string,
  ) {
    return this.moviesService.findAll(mediaType, genres, page);
  }

  @Get('genres')
  findGenres(@Query('mediaType') mediaType?: string) {
    return this.moviesService.findGenres(mediaType);
  }

  @Get(':id/streamings')
  async findStreamingsByMedia(
    @Param('id') id: string,
    @Query('mediaType') mediaType?: string,
  ) {
    const watchProviders = await this.moviesService.findStreamings(
      id,
      mediaType,
    );

    const brazilianProviders = watchProviders?.results?.BR?.flatrate || [];
    return brazilianProviders;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('mediaType') mediaType?: string) {
    return this.moviesService.findOne(+id, mediaType);
  }
}
