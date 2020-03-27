const routes = require('express').Router();

const OngRoutes = require('./Ong.routes');
const IncidentRoutes = require('./Incident.routes');

const ProfileController = require('../controllers/ProfileController');
const SessionController = require('../controllers/SessionController');

routes.use('/ongs', OngRoutes);
routes.use('/incidents', IncidentRoutes);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.store);

module.exports = routes;
