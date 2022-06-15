const { connection } = require('../../db-connection');

class Experience {
    static findMany() {
        const sql = "SELECT * FROM experiences";
        return connection.promise().query(sql);
    }

    static findManyWithTasks() {
        const sql = "SELECT id_experience, name_experience, place_experience, starting_year, ending_year, id_task, name_task FROM experiences AS e JOIN tasks AS t ON t.experience_id = id_experience";
        return connection.promise().query(sql);
    }

    static findOne(id) {
        const sql = "SELECT * FROM experiences WHERE id_experience = ?";
        return connection.promise().query(sql, [id]);
    }

    static findOneWithTasks(id) {
        const sql = "SELECT id_experience, name_experience, place_experience, starting_year, ending_year, id_task, name_task FROM experiences AS e JOIN tasks AS t ON t.experience_id = id_experience WHERE id_experience = ?";
        return connection.promise().query(sql, [id]);
    }

    static createOne(experience) {
        const sql = "INSERT INTO experiences SET ?";
        return connection.promise().query(sql, [experience]);
    }

    static updateOne(id, experience) {
        const sql = "UPDATE experiences SET ? WHERE id_experience = ?";
        return connection.promise().query(sql, [experience, id]);
    }

    static deleteOne(id) {
        const sql = "DELETE FROM experiences WHERE id_experience = ?";
        return connection.promise().query(sql, [id]);
    }
}

module.exports = Experience;