import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
  logoutUser,
} from '../controllers/user';
import authHandler from '../middlewares/auth';

const router = Router();

router.post('/', createUser);

router.put('/:id', authHandler, updateUser);
router.delete('/:id', authHandler, deleteUser);

router.post('/login', loginUser);
router.post('/logout', authHandler, logoutUser);

if (process.env.NODE_ENV !== 'production') {
  router.get('/:id', getUser); // NOTE: dev only
}

export default router;
