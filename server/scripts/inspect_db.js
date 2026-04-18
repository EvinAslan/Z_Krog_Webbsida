const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite', sqlite3.OPEN_READONLY, (e)=>{ if(e) { console.error(e); process.exit(1); }});

db.all("PRAGMA table_info('products')", (err, rows) => {
  if (err) { console.error(err); process.exit(1); }
  console.log(JSON.stringify(rows, null, 2));
  db.close();
});
