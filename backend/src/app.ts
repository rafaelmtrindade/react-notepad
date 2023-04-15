import express from 'express';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then((dotenv) => {
    const envPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: envPath });
  });
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  console.log('received request');
  res.json({ message: 'Hello from server!' });
});

export default app;
