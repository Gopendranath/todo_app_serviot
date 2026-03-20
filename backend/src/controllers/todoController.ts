import { type Request, type Response, type NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import Todo from '../models/Todo.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all todos for a user
// @route   GET /api/v1/todos
// @access  Private
export const getTodos = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Todo.countDocuments({ user: req.user.id });
  const completed = await Todo.countDocuments({ user: req.user.id, completed: true });
  const remaining = total - completed;

  const todos = await Todo.find({ user: req.user.id })
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });

  // Pagination result
  const pagination: any = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: todos.length,
    total,
    completed,
    remaining,
    pagination,
    data: todos,
  });
});

// @desc    Get single todo
// @route   GET /api/v1/todos/:id
// @access  Private
export const getTodo = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the todo
  if (todo.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this todo`, 401));
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

// @desc    Create new todo
// @route   POST /api/v1/todos
// @access  Private
export const createTodo = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const todo = await Todo.create(req.body);

  res.status(201).json({
    success: true,
    data: todo,
  });
});

// @desc    Update todo
// @route   PUT /api/v1/todos/:id
// @access  Private
export const updateTodo = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the todo
  if (todo.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this todo`, 401));
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: todo,
  });
});

// @desc    Delete todo
// @route   DELETE /api/v1/todos/:id
// @access  Private
export const deleteTodo = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the todo
  if (todo.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this todo`, 401));
  }

  await todo.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
