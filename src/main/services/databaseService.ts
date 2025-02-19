import sqlite3 from 'sqlite3';
import path from 'path';

export class DatabaseService {
  private static instance: DatabaseService;
  private db: sqlite3.Database;

  private constructor() {
    const dbPath = path.join(__dirname, '../../database.sqlite');
    this.db = new sqlite3.Database(dbPath);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
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
        });

        // Create media files table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS media_files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER,
            file_path TEXT NOT NULL,
            file_type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) 
              REFERENCES projects (id)
              ON DELETE CASCADE
          )
        `, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });

        // Create transcripts table
        this.db.run(`
          CREATE TABLE IF NOT EXISTS transcripts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) 
              REFERENCES projects (id)
              ON DELETE CASCADE

          )
        `, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });

        resolve();
      });
    });
  }

  async addProject(projectName: string) {
    return new Promise<{ id: number; name: string }>((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO projects (name) VALUES (?)');
      stmt.run(projectName, function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name: projectName });
        }
      });
      stmt.finalize();
    });
  }

  async getProjects() {
    return new Promise<{ id: number; name: string }[]>((resolve, reject) => {
      const stmt = this.db.prepare('SELECT * FROM projects');
      stmt.all((err: Error | null, rows: { id: number; name: string }[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async deleteProject(projectId: string) {
    return new Promise<void>((resolve, reject) => {
      const stmt = this.db.prepare('DELETE FROM projects WHERE id = ?');
      stmt.run(projectId, function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getProject(projectId: string) {
    return new Promise<{ id: string; name: string }>((resolve, reject) => {
      const stmt = this.db.prepare('SELECT * FROM projects WHERE id = ?');
      stmt.get(projectId, (err: Error | null, row: { id: string; name: string }) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async addMediaFile(projectId: number, filePath: string, fileType: string) {
    return new Promise<void>((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO media_files (project_id, file_path, file_type) VALUES (?, ?, ?)');
      stmt.run(projectId, filePath, fileType, function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  }

  async getMediaFiles(projectId: number) {
    return new Promise<{ id: number; project_id: number; file_path: string; file_type: string }[]>((resolve, reject) => {
      const stmt = this.db.prepare('SELECT * FROM media_files WHERE project_id = ?');
      stmt.all(projectId, (err: Error | null, rows: { id: number; project_id: number; file_path: string; file_type: string }[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async addTranscript(projectId: number, content: string) {
    return new Promise<void>((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO transcripts (project_id, content) VALUES (?, ?)');
      stmt.run(projectId, content, function (err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  }

  async getTranscripts(projectId: number) {
    return new Promise<{ id: number; project_id: number; content: string }[]>((resolve, reject) => {
      const stmt = this.db.prepare('SELECT * FROM transcripts WHERE project_id = ?');
      stmt.all(projectId, (err: Error | null, rows: { id: number; project_id: number; content: string }[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}