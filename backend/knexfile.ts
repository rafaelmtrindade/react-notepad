import { Knex } from 'knex';
import path from 'path';
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const production: Knex.Config = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
    extension: 'ts',
  },
};

const development: Knex.Config = {
  ...production,
  debug: true,
  asyncStackTraces: true,
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds'),
    extension: 'ts',
    timestampFilenamePrefix: true,
  },
};

export default {
  development,
  production,
} as { [key: string]: Knex.Config };
