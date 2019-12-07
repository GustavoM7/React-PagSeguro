const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("database.db");
db.close();