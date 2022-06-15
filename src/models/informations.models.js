const { connection } = require('../../db-connection');

class Info {
  static findMany() {
    let sql = "SELECT id_information, profile, looking_for FROM informations";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT id_information, profile, looking_for FROM informations WHERE id_information = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(information) {
    const sql = "INSERT INTO informations SET ?";
    return connection.promise().query(sql, [information]);
  }

  static updateOne(id, info) {
    const sql = "UPDATE informations SET ? WHERE id_information = ?";
    return connection.promise().query(sql, [info, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM informations WHERE id_information = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Info;