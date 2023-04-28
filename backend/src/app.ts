import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import noteRoutes from './routes/note';
import errorHandler from './middlewares/error';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/* ************* ROUTERS VÃO AQUI ************* */

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.get('/test', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('received request');
  res.json({ message: 'Hello from server!' });
});

/* ************* FIM DOS ROUTERS ************* */

app.use(errorHandler);

export default app;
