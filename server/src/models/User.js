const { db } = require('../config/db.js');

db.connect().then(obj => {
  console.log("✅ Success. ");
  obj.done();
}).catch(error => {
  console.error(error.message);
})

class User {
  static async findByEmail(email) {
    const result = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    return result;
  }

  static async create({ email, passwordHash }) {
    return await db.one('INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email, created_at', [email, passwordHash]);
  }
}

module.exports = { User };
