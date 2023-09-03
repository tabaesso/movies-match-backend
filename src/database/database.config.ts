import { DataSource, DataSourceOptions } from 'typeorm';
// const configService = new ConfigService();

// export const dataSourceInstance = new DataSource({
//   type: 'postgres',
//   host: configService.get<string>('DATABASE_HOST'),
//   port: parseInt(configService.get<string>('DATABASE_PORT')),
//   username: configService.get<string>('DATABASE_USERNAME'),
//   password: configService.get<string>('DATABASE_PASSWORD'),
//   database: configService.get<string>('DATABASE_NAME'),
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
//   synchronize: false,
// });

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
