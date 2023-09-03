import { DataSource, DataSourceOptions } from 'typeorm';

// TODO: Fix .env issue
export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: `localhost`,
  port: 5432,
  username: `postgres`,
  password: `postgres`,
  database: `postgres`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const databaseInstance = new DataSource(databaseConfig);
