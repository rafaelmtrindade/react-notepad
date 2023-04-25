import {
  Request as Req,
  Response as Res,
  NextFunction as Next,
  CookieOptions,
} from 'express';
import Joi from 'joi';
import userService from '../services/user';
import { generateToken } from '../utils/auth';
import HttpError from '../utils/error';

const authCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24,
  path: '/',
};

const idSchema = Joi.number().integer().positive().required();
const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z ]*$/)
    .trim()
    .custom((val: string) => {
      return val.replace(/\b\w/g, (c: string) => c.toUpperCase());
    })
    .alter({
      create: (schema) => schema.required(),
    }),
  email: Joi.string()
    .email()
    .trim()
    .required()
    .alter({
      update: (schema) => schema.optional(),
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{2,}$/)
    .required()
    .alter({
      update: (schema) => schema.optional(),
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .forbidden()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) =>
        schema.when('password', {
          is: Joi.exist(),
          then: schema.required(),
        }),
    })
    .strip(),
});

const tokenCookie = {
  set: (res: Res, payload: any) => {
    const token = generateToken(payload);
    res.cookie('token', token, authCookieOptions);
  },
  clear: (res: Res) => {
    res.clearCookie('token', { ...authCookieOptions, maxAge: 0 });
  },
};

/************** HANDLERS **************/
export const createUser = async (req: Req, res: Res, next: Next) => {
  const { error, value: data } = userSchema
    .tailor('create')
    .validate(req.body, {
      abortEarly: false,
    }); // TODO: test capitalize name
  if (error) next(new HttpError(400, 'Dados inválidos', error));

  try {
    const user = await userService.createUser(data);
    if (!user) throw new HttpError(500, 'Erro ao criar usuário');

    // const token = generateToken({ id: user.id });
    // res.cookie('token', token, authCookieOptions);
    tokenCookie.set(res, { id: user.id });
    res.status(201).json({ user });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY' && error.message.includes('email')) {
      next(new HttpError(409, 'Email já cadastrado'));
    }
    next(error);
  }
};

export const getUser = async (req: Req, res: Res, next: Next) => {
  try {
    const { error, value: id } = idSchema.validate(req.params.id);
    if (error) throw new HttpError(400, 'ID inválido', error);

    const user = await userService.getUser(id);
    if (!user) throw new HttpError(404, 'Usuário não encontrado');
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Req, res: Res, next: Next) => {
  try {
    const { error: idError, value: id } = idSchema.validate(req.params.id);
    if (idError) throw new HttpError(400, 'ID inválido');
    if (req.user?.id !== id) throw new HttpError(403, 'Acesso negado');

    const { error, value: data } = userSchema
      .tailor('update')
      .validate(req.body);
    if (error) throw new HttpError(400, 'Dados inválidos', error);

    const user = await userService.updateUser(id, data);
    if (!user) throw new HttpError(404, 'Usuário não encontrado');

    res.json({ user });
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (req: Req, res: Res, next: Next) => {
  try {
    const { error, value: id } = idSchema.validate(req.params.id);
    if (error) throw new HttpError(400, 'ID inválido', error);
    if (req.user?.id !== id) throw new HttpError(403, 'Acesso negado');

    await userService.deleteUser(id as number);

    // res.clearCookie('token', { ...authCookieOptions, maxAge: 0 });
    tokenCookie.clear(res);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Req, res: Res, next: Next) => {
  try {
    const { error, value: creds } = userSchema
      .tailor('login')
      .validate(req.body, {
        abortEarly: false,
      });
    if (error) throw new HttpError(400, 'Dados inválidos', error);

    const { email, password } = creds as { email: string; password: string };

    const user = await userService.findByCreds(email, password);
    if (!user) throw new HttpError(401, 'Email ou senha inválidos');

    // const token = generateToken({ id: user.id });
    // res.cookie('token', token, authCookieOptions);
    tokenCookie.set(res, { id: user.id });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Req, res: Res, next: Next) => {
  try {
    // res.clearCookie('token', { ...authCookieOptions, maxAge: 0 });
    tokenCookie.clear(res);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
