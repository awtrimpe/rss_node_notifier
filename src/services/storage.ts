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
 * Create neccesary tables if they do not exist already
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
    },
  );
}

// TODO: Determine closing strategy
// db.close();
