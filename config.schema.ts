import * as Joi from '@hapi/joi';

/**
 * Schema di validazione per i parametri di ambiente
 */
export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  ENV: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
