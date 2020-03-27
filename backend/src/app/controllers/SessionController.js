const Ong = require('../models/Ong');

module.exports = {
  async store(req, res) {
    const { id } = req.body;

    const response = await Ong.getOneOng({ id });

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  }
};
