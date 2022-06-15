const argon2 = require("argon2");

const { connection } = require('../../db-connection');

class User {
  static findMany() {
    const sql = "SELECT * FROM users";
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT * FROM users WHERE id_user = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(user) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql, [user]);
  }

  static updateOne(id, newUser) {
    const sql = "UPDATE users SET ? WHERE id_user = ?";
    return connection.promise().query(sql, [newUser, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM users WHERE id_user = ?";
    return connection.promise().query(sql, [id]);
  }

  static async emailAlreadyExists(email) {
    const sql = "SELECT email FROM users WHERE email=?";
    const [result] = await connection.promise().query(sql, [email]);
    return result.length > 0;
  }

  static findOneByEmail(email) {
    const sql = "SELECT id_user, email, password FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static validatePassword(password) {
    return password.length >= 8;
  }

  static async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  static async verifyPassword(hashedPassword, password) {
    const valid = await argon2.verify(password, hashedPassword);
    return valid;
  }
} 

module.exports = User;