const Incident = require('../models/Incident');

module.exports = {
  async delete(req, res) {
    const ong_id = req.headers.authorization;
    const { incident_id } = req.params;

    const response = await Incident.deleteIncident({ incident_id, ong_id });

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  },

  async index(req, res) {
    const { page = 1 } = req.query;
    const response = await Incident.getAllIncidents(page);

    res.header('X-Total-Count', response.count['count(*)']);

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined, count: undefined });
  },

  async store(req, res) {
    const ong_id = req.headers.authorization;

    const response = await Incident.createIncident({
      ...req.body,
      ong_id
    });

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  }
};
