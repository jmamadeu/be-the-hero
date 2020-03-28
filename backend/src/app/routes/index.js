const routes = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');

const OngRoutes = require('./Ong.routes');
const IncidentRoutes = require('./Incident.routes');

const ProfileController = require('../controllers/ProfileController');
const SessionController = require('../controllers/SessionController');

routes.use('/ongs', OngRoutes);
routes.use('/incidents', IncidentRoutes);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

routes.post('/sessions', SessionController.store);

module.exports = routes;
