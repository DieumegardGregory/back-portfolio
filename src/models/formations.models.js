const { connection } = require('../../db-connection');

class Formation {
  static findMany() {
    let sql = "SELECT * FROM formations";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT * FROM formations WHERE id_formation = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(formation) {
    const sql = "INSERT INTO formations SET ?";
    return connection.promise().query(sql, [formation]);
  }

  static updateOne(id, formation) {
    const sql = "UPDATE formations SET ? WHERE id_formation = ?";
    return connection.promise().query(sql, [formation, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM formations WHERE id_formation = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Formation;