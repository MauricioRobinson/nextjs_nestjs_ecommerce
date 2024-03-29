import * as Joi from 'joi';

export const EnvValidator = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().port().default(8000),
  DB_URL: Joi.string()
    .min(1, 'utf8')
    .uri({
      scheme: ['postgresql', /postgresql\+postgres?/],
    })
    .required(),
});
