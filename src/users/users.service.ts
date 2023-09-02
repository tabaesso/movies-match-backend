import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { REPOSITORIES } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(updateUserDto);
  }

  remove(user: User) {
    return this.usersRepository.remove(user);
  }
}
