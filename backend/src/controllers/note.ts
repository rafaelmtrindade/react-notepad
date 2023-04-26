import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import Joi from 'joi';
import noteService from '../services/note';
import HttpError from '../utils/error';

const idSchema = Joi.number().integer().positive().required();

const noteSchema = Joi.object({
  title: Joi.string()
    .trim()
    .allow('')
    .alter({
      create: (schema) => schema.required(),
    }),
  content: Joi.string()
    .allow('')
    .alter({
      create: (schema) => schema.required(),
    }),
  userId: Joi.number().integer().positive().required(),
});

// TODO: listingSchema

export const createNote = async (req: Req, res: Res, next: Next) => {
  try {
    const { error, value: data } = noteSchema
      .tailor('create')
      .validate({ ...req.body, userId: req.user?.id }, { abortEarly: false });
    if (error) throw new HttpError(400, 'Dados inválidos', error);

    const note = await noteService.createNote(data);
    if (!note) throw new HttpError(500);

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req: Req, res: Res, next: Next) => {
  try {
    const { error, value: id } = idSchema.validate(req.params.id);
    if (error) throw new HttpError(400, 'ID inválido', error);
    if (req.user?.id !== id) throw new HttpError(403, 'Acesso negado');

    const note = await noteService.getNote(id);
    if (!note) throw new HttpError(404, 'Nota não encontrada');
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req: Req, res: Res, next: Next) => {
  try {
    // TODO: Implementar opções de listagem
    const { error, value: userId } = idSchema.validate(req.user?.id);
    if (error) throw new HttpError(400, 'Usuário inválido');

    const notes = await noteService.getNotes(userId);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req: Req, res: Res, next: Next) => {
  try {
    const { error: idError, value: id } = idSchema.validate(req.params.id);
    if (idError) throw new HttpError(400, 'ID inválido');
    if (req.user?.id !== id) throw new HttpError(403, 'Acesso negado');

    const { error, value: data } = noteSchema
      .tailor('update')
      .validate(req.body);
    if (error) throw new HttpError(400, 'Dados inválidos', error);

    const note = await noteService.updateNote(id, data);
    if (!note) throw new HttpError(404, 'Nota não encontrada');

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req: Req, res: Res, next: Next) => {
  try {
    const { error, value: id } = idSchema.validate(req.params.id);
    if (error) throw new HttpError(400, 'ID inválido', error);
    if (req.user?.id !== id) throw new HttpError(403, 'Acesso negado');

    await noteService.deleteNote(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
};
