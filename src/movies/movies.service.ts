import { HttpException, Injectable, Logger, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { MEDIA_CATEGORIES, MOVIES_DB_API_NAME } from 'src/constants';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(private readonly httpService: HttpService) {}

  async findAll(mediaType?: string, genres?: string) {
    if (!mediaType || !genres) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Missing query parameters`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Object.values(MEDIA_CATEGORIES).includes(mediaType)) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Invalid media type`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const formattedGenres = genres.replace(/,/g, '|');

    // TODO: A kind of mixer to return different movies from different pages and genres
    const movieEndpoint = `/discover/${mediaType}?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${formattedGenres}`;

    const { data } = await firstValueFrom(
      this.httpService.get(movieEndpoint).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            `${MOVIES_DB_API_NAME} - Bad request`,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
    return data;
  }

  async findGenres(mediaType?: string) {
    if (!mediaType) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Missing query parameters`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Object.values(MEDIA_CATEGORIES).includes(mediaType)) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Invalid media type`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { data } = await firstValueFrom(
      this.httpService.get(`/genre/${mediaType}/list?language=pt-BR`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            `${MOVIES_DB_API_NAME} - Bad request`,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
    return data;
  }

  async findStreamings(id: string, mediaType?: string) {
    if (!mediaType) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Missing query parameters`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Object.values(MEDIA_CATEGORIES).includes(mediaType)) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Invalid media type`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { data } = await firstValueFrom(
      this.httpService.get(`/${mediaType}/${id}/watch/providers`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            `${MOVIES_DB_API_NAME} - Bad request`,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
    return data;
  }

  async findOne(id: number, mediaType?: string) {
    if (!mediaType) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Missing query parameters`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Object.values(MEDIA_CATEGORIES).includes(mediaType)) {
      throw new HttpException(
        `${MOVIES_DB_API_NAME} - Invalid media type`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { data } = await firstValueFrom(
      this.httpService.get(`/${mediaType}/${id}?language=pt-BR`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            `${MOVIES_DB_API_NAME} - Bad request`,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );

    return data;
  }
}
