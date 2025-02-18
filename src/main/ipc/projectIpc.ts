import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Set up an IPC handler for inserting a new project
ipcMain.handle('new-project', (_event, projectName: string) => {
  return new Promise<{ id: number; name: string }>((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO projects (name) VALUES (?)');
    stmt.run(projectName, function (err: Error | null) {
      if (err) {
        reject(err);
      } else {
        // Return the newly created project data, including its new ID
        resolve({ id: this.lastID, name: projectName });
      }
    });
    stmt.finalize();
  });
});

ipcMain.handle('get-projects', () => {
    return new Promise<{ id: number; name: string }[]>((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM projects');
        stmt.all((err: Error | null, rows: { id: number; name: string }[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

ipcMain.handle('delete-project', (_event, projectId: string) => {
    return new Promise<void>((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
        stmt.run(projectId, function (err: Error | null) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
});