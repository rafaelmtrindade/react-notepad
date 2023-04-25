import knex from '../db/connection';
import { hashPassword } from '../utils/encryption';

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  password?: string;
}

export interface User extends NewUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const allowedColumns = {
  id: 'id',
  name: 'name',
  email: 'email',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const create = (user: NewUser) => {
  const password = hashPassword(user.password);
  return knex<User>('users')
    .insert({ ...user, password })
    .returning('id');
};

const findById = (id: number) => {
  return knex<User>('users').select(allowedColumns).where({ id }).first();
};

const findByCredentials = (email: string, password: string) => {
  return knex<User>('users')
    .select(allowedColumns)
    .where({ email, password: hashPassword(password) })
    .first();
};

const update = (id: number, user: UpdateUser) => {
  return knex<User>('users').where({ id }).update(user).returning('id');
};

const del = (id: number) => {
  return knex('users').where({ id }).del();
};

export default {
  create,
  findByCredentials,
  findById,
  update,
  del,
};
