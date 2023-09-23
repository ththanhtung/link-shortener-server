import dotenv from 'dotenv';

dotenv.config({
  path: 'dev.env',
});

interface IServerCfg {
  port: number;
}

interface IDatabaseCfg {
  dbPort: number;
  dbName: string;
  dbType: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
}

interface Iconfig {
  serverCfg: IServerCfg
  databaseCfg: IDatabaseCfg
}

export const loadConfig = (): Iconfig => {
  if (!process.env.SERVER_PORT) {
    throw new Error('server port must be provided');
  }
  if (!process.env.DB_NAME) {
    throw new Error('database name port be provided');
  }
  if (!process.env.DB_TYPE) {
    throw new Error('database type must be provided');
  }
  if (!process.env.DB_PORT) {
    throw new Error('database port must be provided');
  }
  if (!process.env.DB_HOST) {
    throw new Error('database host must be provided');
  }
  if (!process.env.DB_USER) {
    throw new Error('database user must be provided');
  }
  if (!process.env.DB_PASSWORD) {
    throw new Error('database password must be provided');
  }

  return {
    serverCfg: {
      port: +process.env.SERVER_PORT,
    },
    databaseCfg: {
      dbPort: +process.env.DB_PORT,
      dbHost: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASSWORD,
      dbType: process.env.DB_TYPE,
    },
  };
};
