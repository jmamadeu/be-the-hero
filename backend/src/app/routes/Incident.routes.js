const routes = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');

const IncidentController = require('../controllers/IncidentController');

routes.post('/', IncidentController.store);
routes.get('/', IncidentController.index);

routes.delete(
  '/:incident_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      incident_id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;
