const routes = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('../controllers/OngController');

routes.get('/', OngController.index);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      whatsapp: Joi.string()
        .required()
        .min(9)
        .max(15),
      city: Joi.string().required(),
      uf: Joi.string().length(2)
    })
  }),
  OngController.store
);

module.exports = routes;
