const routes = require('express').Router();

const IncidentController = require('../controllers/IncidentController');

routes.post('/', IncidentController.store);
routes.get('/', IncidentController.index);
routes.delete('/:incident_id', IncidentController.delete);

module.exports = routes;
