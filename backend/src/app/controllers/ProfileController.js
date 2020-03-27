const Incident = require('../models/Incident');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const response = await Incident.getAllIncidentsOfOng(ong_id);

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  }
};
