import knex from 'knex';
import paht from 'path';

const db  = knex({
  client: 'sqlite3',
  connection: {
    filename: paht.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
});

export default db;