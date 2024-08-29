import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(
  '../storage/main.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      createTables();
    }
  },
);

/**
 * Create necessary tables if they do not exist already
 */
function createTables() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time INTEGER NOT NULL,
            json TEXT NOT NULL
        )`);
}

/**
 * Inserts any object type into the logs table
 */
export function addLog(json: object) {
  db.run(
    'INSERT INTO logs(time, json) VALUES(?, ?)',
    [new Date(), json],
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('Row was added to the table: ${this.lastID}');
      checkRowCount();
    },
  );
}

/**
 * Removes any entries over the 100 limit
 */
function checkRowCount(): void {
  db.get('SELECT COUNT(*) FROM logs', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      if (rows[0].count > 100) {
        // Will remove all items above count
        db.run('DELETE FROM logs WHERE id IN (SELECT id FROM logs LIMIT ?)', rows[0].count, (err) => {
          if (err) {
            console.log(err);
           }
          });
      }
    }
  });
}