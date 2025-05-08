const Database = require('better-sqlite3');
const db = new Database('store.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    password TEXT
  )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS cart_items (
      user_email TEXT,
      product_id INTEGER,
      quantity INTEGER,
      PRIMARY KEY (user_email, product_id),
      FOREIGN KEY (user_email) REFERENCES users(email)
    )
  `).run();

module.exports = db;
