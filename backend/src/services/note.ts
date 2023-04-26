import db from '../db/connection';
import Note, { NewNote } from '../models/note';

export const createNote = async (note: NewNote) => {
  return await db.transaction(async (trx) => {
    const [id] = await Note.create(note).transacting(trx);
    // could fail if user doesn't exist
    return await Note.findById(+id).transacting(trx);
  });
};

export const getNote = async (id: number) => {
  return await Note.findById(id);
};

// TODO: add options to search etc.
export const getNotes = async (userId: number) => {
  return await Note.findByUserId(userId);
};

export const updateNote = async (id: number, note: NewNote) => {
  return await db.transaction(async (trx) => {
    const [updatedID] = await Note.update(id, note).transacting(trx);
    return await Note.findById(+updatedID).transacting(trx);
  });
};

export const deleteNote = async (id: number) => {
  return await db.transaction(async (trx) => {
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
