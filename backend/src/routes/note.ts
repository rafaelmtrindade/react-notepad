import { Router } from 'express';
import {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
} from '../controllers/note';
import authHandler from '../middlewares/auth';

const router = Router();

router.use(authHandler);
router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
