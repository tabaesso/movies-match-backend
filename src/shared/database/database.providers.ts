import { dataSourceInstance } from './database.config';

export const databaseProviders = [
  {
    provide: 'DATABASE_SOURCE',
    useFactory: async () => {
      const dataSource = dataSourceInstance;

      dataSource.initialize();
    },
  },
];
