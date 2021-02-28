import {Request, Response} from "express";
import {NextFunction} from "connect";
import * as jwt from "jsonwebtoken";

export function checkJwtToken(req: Request, res: Response, next: NextFunction, secret: string): void|Response {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }
  const token = tokenBearer[1];
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    return next();
  });
}
