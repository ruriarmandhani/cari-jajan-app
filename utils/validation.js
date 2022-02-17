import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(11).required(),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

export const sellerValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    items: Joi.array().required(),
  });
  return schema.validate(data);
};
