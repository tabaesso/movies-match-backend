import { SessionGenres } from 'src/session-genres/entities/session-genres.entity';
import { SessionMembers } from 'src/session-members/entities/session-members.entity';
import { SessionVotes } from 'src/session-votes/entities/session-votes.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

// TODO: Fix .env issue
export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: `localhost`,
  port: 5432,
  username: `postgres`,
  password: `postgres`,
  database: `postgres`,
  entities: [User, Session, SessionGenres, SessionMembers, SessionVotes],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const databaseInstance = new DataSource(databaseConfig);
