const { connection } = require('../../db-connection');

class Softskill {
  static findMany() {
    let sql = "SELECT * FROM softskills";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT * FROM softskills WHERE id_softskill = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(softskill) {
    const sql = "INSERT INTO softskills SET ?";
    return connection.promise().query(sql, [softskill]);
  }

  static updateOne(id, softskill) {
    const sql = "UPDATE softskills SET ? WHERE id_softskill = ?";
    return connection.promise().query(sql, [softskill, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM softskills WHERE id_softskill = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Softskill;