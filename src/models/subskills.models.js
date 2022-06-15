const { connection } = require('../../db-connection');

class Subskill {
  static findMany() {
    let sql = "SELECT * FROM subskills";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT * FROM subskills WHERE id_subskill = ?";
    return connection.promise().query(sql, [id]);
  }

  static findLinked(hardskillId) {
    let sql = "SELECT id_subskill, name_subskill, hardskill_id FROM subskills WHERE hardskill_id = ?";
    return connection.promise().query(sql, [hardskillId]);
  }

  static createOne(subskill) {
    const sql = "INSERT INTO subskills SET ?";
    return connection.promise().query(sql, [subskill]);
  }

  static updateOne(id, subskill) {
    const sql = "UPDATE subskills SET ? WHERE id_subskill = ?";
    return connection.promise().query(sql, [subskill, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM subskills WHERE id_subskill = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Subskill;