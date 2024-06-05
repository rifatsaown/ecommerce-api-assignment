import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    productId: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  next();
};
