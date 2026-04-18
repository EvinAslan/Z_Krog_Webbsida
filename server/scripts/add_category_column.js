const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

db.run("ALTER TABLE products ADD COLUMN category VARCHAR(255) DEFAULT 'Pizzor'", function(err){
  if (err) { console.error(err); process.exit(1); }
  console.log('Added category column (or it already exists).');
  db.close();
});
