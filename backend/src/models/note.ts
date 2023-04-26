import knex from '../db/connection';

export interface NewNote {
  title: string;
  content: string;
  userId: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

const create = (note: NewNote) => {
  return knex<Note>('notes').insert(note).returning('id');
};

const findById = (id: number) => {
  return knex<Note>('notes').where({ id }).first();
};

const findByUserId = (userId: number) => {
  // TODO: Implementar paginação, limite padrão e busca/filtro
  return knex<Note>('notes').where({ userId });
};

const update = (id: number, note: NewNote) => {
  return knex<Note>('notes').where({ id }).update(note).returning('id');
};

const del = (id: number) => {
  return knex('notes').where({ id }).del();
};

export default {
  create,
  findById,
  findByUserId,
  update,
  del,
};
