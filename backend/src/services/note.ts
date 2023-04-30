import db from '../db/connection';
import Note, { NewNote } from '../models/note';

export const createNote = async (note: NewNote) => {
  return await db.transaction(async (trx) => {
    const [id] = await Note.create(note).transacting(trx);
    // could fail if user doesn't exist
    return await Note.findById(+id).transacting(trx);
  });
};

export const getNote = async (id: number, userId: number) => {
  return await Note.findById(id).where('user_id', userId);
};

// TODO: add options to search etc.
export const getNotes = async (userId: number) => {
  return await Note.findByUserId(userId);
};

export const updateNote = async (id: number, userId: number, note: NewNote) => {
  return await db.transaction(async (trx) => {
    const foundNote = await Note.findById(id)
      .where('user_id', userId)
      .transacting(trx);
    if (!foundNote) return;
    await Note.update(id, note).transacting(trx);
    return await Note.findById(id).transacting(trx);
  });
};

export const deleteNote = async (id: number, userId: number) => {
  return await db.transaction(async (trx) => {
    const note = await Note.findById(id)
      .where('user_id', userId)
      .transacting(trx);
    if (!note) return;
    await Note.del(id).transacting(trx);
  });
};

export default {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
};
