import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/error';

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof HttpError)) {
    err = new HttpError(500, 'Erro interno', err);
  }
  const { statusCode, message, details } = err;

  if (statusCode >= 500) console.error(err);

  res = res.status(statusCode);
  res.json({
    message,
    ...(details && { details }),
  });
};

export default errorHandler;
