import { CookieOptions } from 'express';

export const getCookieOption = (): CookieOptions => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'development') {
    return {
      path: '/',
      maxAge: 360000,
    };
  }
  return {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 360000,
    domain: '.bypass어쩌구.com',
  };
};
