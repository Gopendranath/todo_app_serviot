import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

interface DecodedToken {
  id: string;
}

// Protect routes
export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies[process.env.COOKIE_NAME || 'access_token']) {
    token = req.cookies[process.env.COOKIE_NAME || 'access_token'];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse('User not found with this id', 404));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
