const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../../database/connection');

class Ong {
  static async getOneOng(filters) {
    const ong = await connection('ongs')
      .where(filters)
      .first();

    if (!ong) {
      return {
        success: false,
        messages: ['A Ong não exite!'],
        statusCode: 400
      };
    }

    return {
      success: true,
      statusCode: 200,
      data: ong
    };
  }

  static async getAllOngs() {
    const ongs = await connection('ongs').select();

    return {
      success: true,
      statusCode: 200,
      data: ongs
    };
  }

  static async createOng({ name, email, whatsapp, city, uf }) {
    const id = generateUniqueId();

    try {
      let ong = await connection('ongs')
        .where({
          name,
          email
        })
        .first();

      if (!ong) {
        await connection('ongs').insert({
          id,
          name,
          email,
          whatsapp,
          city,
          uf
        });
        return {
          success: true,
          messages: ['Ong, cadastrada com êxito!'],
          statusCode: 200,
          data: { id }
        };
      }

      return {
        success: false,
        messages: ['Ong existente!'],
        statusCode: 400
      };
    } catch (err) {
      return {
        success: false,
        messages: ['Houve um erro, tente novamente!'],
        statusCode: 400
      };
    }
  }
}

module.exports = Ong;
