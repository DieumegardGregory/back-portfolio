const { connection } = require('../../db-connection');

class Task {
  static findMany() {
    let sql = "SELECT * FROM tasks";
    return connection.promise().query(sql);
  }

  static findLinked(experienceId) {
    let sql = "SELECT id_task, name_task, experience_id FROM tasks WHERE experience_id = ?";
    return connection.promise().query(sql, [experienceId]);
  }

  static findOne(id) {
    const sql = "SELECT * FROM tasks WHERE id_task = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(task) {
    const sql = "INSERT INTO tasks SET ?";
    return connection.promise().query(sql, [task]);
  }

  static updateOne(id, task) {
    const sql = "UPDATE tasks SET ? WHERE id_task = ?";
    return connection.promise().query(sql, [task, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM tasks WHERE id_task = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Task;