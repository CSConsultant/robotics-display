const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'scoring.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Create FLL Teams table
    db.run(`CREATE TABLE IF NOT EXISTS fll_teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teamName TEXT NOT NULL,
      pitNumber INTEGER NOT NULL,
      round1Score INTEGER DEFAULT 0,
      round2Score INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating fll_teams table:', err);
      else console.log('FLL Teams table ready');
    });

    // Create Robofest Teams table
    db.run(`CREATE TABLE IF NOT EXISTS robofest_teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teamName TEXT NOT NULL,
      teamNumber INTEGER NOT NULL,
      score INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating robofest_teams table:', err);
      else console.log('Robofest Teams table ready');
    });

    // Create Timer History table
    db.run(`CREATE TABLE IF NOT EXISTS timer_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      competitionType TEXT NOT NULL,
      teamId INTEGER NOT NULL,
      duration INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating timer_history table:', err);
      else console.log('Timer History table ready');
    });
  });
}

// Helper functions to run database queries
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  db,
  initializeDatabase,
  runAsync,
  getAsync,
  allAsync
};
