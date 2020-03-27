const routes = require('express').Router();

const OngController = require('../controllers/OngController');

routes.get('/', OngController.index);
routes.post('/', OngController.store);

module.exports = routes;
