import db from '../db/connection';
import User, { NewUser, UpdateUser } from '../models/user';

export const createUser = async (user: NewUser) => {
  return await db.transaction(async (trx) => {
    const [id] = await User.create(user).transacting(trx);
    return await User.findById(+id).transacting(trx);
  });
};

export const getUser = async (id: number) => {
  return await User.findById(id);
};

export const updateUser = async (id: number, user: UpdateUser) => {
  return await db.transaction(async (trx) => {
    const [updatedID] = await User.update(id, user).transacting(trx);
    return await User.findById(+updatedID).transacting(trx);
  });
};

export const deleteUser = async (id: number) => {
  return await db.transaction(async (trx) => {
    await User.del(id).transacting(trx);
  });
};

export const findByCreds = async (email: string, password: string) => {
  return await User.findByCredentials(email, password);
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  findByCreds,
};
