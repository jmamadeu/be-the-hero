const connection = require('../../database/connection');

class Incident {
  static async getAllIncidentsOfOng(ong_id) {
    const incidents = await connection('incidents').where({ ong_id });

    return {
      statusCode: 200,
      success: true,
      data: incidents
    };
  }

  static async deleteIncident({ incident_id, ong_id }) {
    const incident = await connection('incidents')
      .where({
        id: incident_id
      })
      .select('ong_id')
      .first();

    if (incident.ong_id != ong_id) {
      return {
        statusCode: 401,
        success: false,
        messages: ['O incidente, não pertence a esta organização'],
        data: ong_id
      };
    }

    await connection('incidents')
      .where('id', incident_id)
      .delete();

    return {
      statusCode: 200,
      success: true,
      messages: ['O incidente, foi deletado com êxito!']
    };
  }

  static async getAllIncidents(page) {
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    const [count] = await connection('incidents').count();

    return {
      statusCode: 200,
      success: true,
      data: incidents,
      count
    };
  }

  static async createIncident({ title, value, description, ong_id }) {
    try {
      const [id] = await connection('incidents').insert({
        title,
        value,
        description,
        ong_id
      });

      return {
        statusCode: 200,
        messages: ['Incidente, cadastrado com êxito!'],
        success: true,
        data: { id }
      };
    } catch (err) {
      return {
        statusCode: 400,
        messages: ['Erro no cadastro, tente novamente'],
        success: false
      };
    }
  }
}

module.exports = Incident;
