import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/customError';

export const errorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    res.status(400).send({
      errors: [
        {
          message: 'something went wrong',
        },
      ],
    });
  }
};
