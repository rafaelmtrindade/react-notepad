import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// import userRoutes from './routes/user';
import errorHandler from './middlewares/error';

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then((dotenv) => {
    const envPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: envPath });
  });
}

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

// app.use('/users', userRoutes);

app.get('/test', (req, res) => {
  console.log('received request');
  res.json({ message: 'Hello from server!' });
});

/* ************* FIM DOS ROUTERS ************* */

app.use(errorHandler);

export default app;
