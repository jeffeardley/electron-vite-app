import { ipcMain } from 'electron';
import { DatabaseService } from '../services/databaseService';

const db = DatabaseService.getInstance();

// Set up an IPC handler for inserting a new project
ipcMain.handle('new-project', async (_event, projectName: string) => {
  return await db.addProject(projectName);
});

ipcMain.handle('get-projects', async () => {
    return await db.getProjects();
});

ipcMain.handle('delete-project', async (_event, projectId: string) => {
    return await db.deleteProject(projectId);
});

ipcMain.handle('get-project', async (_event, projectId: string) => {
  return await db.getProject(projectId);
});