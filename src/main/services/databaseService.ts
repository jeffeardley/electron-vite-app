import sqlite3 from 'sqlite3';
import path from 'path';

export class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    const dbPath = path.join(__dirname, '../../database.sqlite');
    this.db = new sqlite3.Database(dbPath);
  }

  async initialize() {
    return new Promise<void>((resolve, reject) => {
      this.db.serialize(() => {
        // Create projects table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  }
}