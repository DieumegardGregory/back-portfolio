const { connection } = require('../../db-connection');

class Hardskill {
  static findMany() {
    let sql = "SELECT * FROM hardskills";
    return connection.promise().query(sql);
  }

  static findManyWithSubskills() {
    let sql = "SELECT id_hardskill, name_hardskill, id_subskill, name_subskill FROM hardskills AS h JOIN subskills AS s ON s.hardskill_id = h.id_hardskill";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT * FROM hardskills WHERE id_hardskill = ?";
    return connection.promise().query(sql, [id]);
  }

  static findOneWithSubskills(id) {
    const sql = "SELECT id_hardskill, name_hardskill, id_subskill, name_subskill FROM hardskills AS h JOIN subskills AS s ON s.hardskill_id = h.id_hardskill WHERE id_hardskill = ?";
    return connection.promise().query(sql, [id]);
}

  static createOne(hardskill) {
    const sql = "INSERT INTO hardskills SET ?";
    return connection.promise().query(sql, [hardskill]);
  }

  static updateOne(id, hardskill) {
    const sql = "UPDATE hardskills SET ? WHERE id_hardskill = ?";
    return connection.promise().query(sql, [hardskill, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM hardskills WHERE id_hardskill = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Hardskill;