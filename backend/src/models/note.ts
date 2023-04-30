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

const snakeNote = (note: NewNote) => ({
  title: note.title,
  content: note.content,
  user_id: note.userId,
});

const create = (note: NewNote) => {
  return knex<Note>('notes').insert(snakeNote(note)).returning('id');
};

const findById = (id: number) => {
  const fields = {
    id: 'id',
    title: 'title',
    content: 'content',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
  return knex<Note>('notes').select(fields).where({ id }).first();
};

const findByUserId = (userId: number) => {
  // TODO: Implementar paginação, limite padrão e busca/filtro
  const fields = {
    id: 'id',
    title: 'title',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
  return knex<Note>('notes').select(fields).where('user_id', userId);
};

const update = (id: number, note: NewNote) => {
  return knex<Note>('notes')
    .where({ id })
    .update(snakeNote(note))
    .returning('id');
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
