import jwt, { type SignOptions } from 'jsonwebtoken';
import { type Response } from 'express';

const generateToken = (res: Response, userId: string) => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '30d') as any,
  };

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, options);

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie(process.env.COOKIE_NAME || 'access_token', token, {
    httpOnly: true,
    secure: isProduction || process.env.COOKIE_SECURE === 'true',
    sameSite: (process.env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none') || (isProduction ? 'strict' : 'lax'),
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;
