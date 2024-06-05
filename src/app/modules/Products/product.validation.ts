import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    variants: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required(),
          value: Joi.string().required(),
        }),
      )
      .required(),
    inventory: Joi.object({
      quantity: Joi.number().required(),
      inStock: Joi.boolean().required(),
    }).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  next();
};
