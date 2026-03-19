import express, { type Router } from 'express';
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

export default router;
