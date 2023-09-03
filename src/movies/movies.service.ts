import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get('/3/discover/movie?language=pt-BR'),
    );
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
