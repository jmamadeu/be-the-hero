const Ong = require('../models/Ong');

module.exports = {
  async index(req, res) {
    const response = await Ong.getAllOngs();
    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  },

  async store(req, res) {
    const response = await Ong.createOng(req.body);

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  }
};
