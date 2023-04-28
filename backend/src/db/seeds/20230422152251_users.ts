import { Knex } from 'knex';
import { hashPassword } from '../../utils/encryption';

const newUser = (count: number) => ({
  id: count,
  name: `user${count}`,
  email: `user${count}@example.com`,
  password: hashPassword(`user${count}`),
});

export async function seed(knex: Knex): Promise<void> {
  const userAmt = 5;

  const users: object[] = [];
  for (let i = 1; i <= userAmt; i++) {
    users.push(newUser(i));
  }

  await knex('users').del();
  await knex('users').insert(users);
}
