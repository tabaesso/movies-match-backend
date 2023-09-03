import { DataSource } from 'typeorm';
import { Session } from './entities/session.entity';
import { DATABASE_SOURCE, REPOSITORIES } from 'src/constants';

export const sessionsProviders = [
  {
    provide: REPOSITORIES.SESSIONS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
    inject: [DATABASE_SOURCE],
  },
];
