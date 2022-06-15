const { connection } = require('../../db-connection');

class Project {
  static findMany() {
    let sql = "SELECT id_project, name_project, imgUrl_project FROM projects";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT id_project, name_project, imgUrl_project, description_project FROM projects WHERE id_project = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(project) {
    const sql = "INSERT INTO projects SET ?";
    return connection.promise().query(sql, [project]);
  }

  static updateOne(id, newProject) {
    const sql = "UPDATE projects SET ? WHERE id_project = ?";
    return connection.promise().query(sql, [newProject, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM projects WHERE id_project = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Project;