import Joi from 'joi';

export const RolePathSchema = Joi.object({
  id: Joi.string().min(16).max(24).alphanum().lowercase().required(),
  role: Joi.string().min(1).required(),
});
