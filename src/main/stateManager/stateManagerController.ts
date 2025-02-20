import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { StateManagerService } from './stateManagerService';

export class StateManagerController {
  private static instance: StateManagerController;
  private stateManagerService: StateManagerService;

  private constructor() {
    this.stateManagerService = StateManagerService.getInstance();
    this.registerHandlers();
  }

  public static getInstance(): StateManagerController {
    if (!StateManagerController.instance) {
      StateManagerController.instance = new StateManagerController();
    }
    return StateManagerController.instance;
  }

  private registerHandlers(): void {
    ipcMain.handle('stateManager/new-project', this.handleNewProject.bind(this));
    ipcMain.handle('stateManager/get-projects', this.handleGetProjects.bind(this));
    ipcMain.handle('stateManager/delete-project', this.handleDeleteProject.bind(this));
    ipcMain.handle('stateManager/get-project', this.handleGetProject.bind(this));
  }

  private async handleNewProject(_event: IpcMainInvokeEvent, projectName: string) {
    return await this.stateManagerService.createNewProject(projectName);
  }

  private async handleGetProjects() {
    return await this.stateManagerService.getProjects();
  }

  private async handleDeleteProject(_event: IpcMainInvokeEvent, projectId: string) {
    return await this.stateManagerService.deleteProject(projectId);
  }

  private async handleGetProject(_event: IpcMainInvokeEvent, projectId: string) {
    return await this.stateManagerService.getProject(projectId);
  }
}