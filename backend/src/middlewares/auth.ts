import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) throw { statusCode: 401, message: 'Login Necessário.' };
    const user = verifyToken(token) as { id: number };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authHandler;
