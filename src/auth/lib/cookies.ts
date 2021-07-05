import { Request } from 'express';

export function cookieExtractor(req?: Request) {
  let token: null | string = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
}
