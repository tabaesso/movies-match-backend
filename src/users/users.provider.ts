import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DATABASE_SOURCE, REPOSITORIES } from 'src/constants';

export const usersProviders = [
  {
    provide: REPOSITORIES.USERS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATABASE_SOURCE],
  },
];
