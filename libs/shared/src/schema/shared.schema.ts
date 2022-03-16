import Joi from 'joi';

export const IdStringSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

export const IdSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const SearchSchema = Joi.object({
  page: Joi.number().min(1).default(0),
  take: Joi.number().min(1).default(20),
});
