import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { ScriptManagerService } from './scriptManagerService';

export class ScriptManagerController {
  private static instance: ScriptManagerController;
  private scriptManagerService: ScriptManagerService;

  private constructor() {
    this.scriptManagerService = ScriptManagerService.getInstance();
    this.registerHandlers();
  }

  public static getInstance(): ScriptManagerController {
    if (!ScriptManagerController.instance) {
      ScriptManagerController.instance = new ScriptManagerController();
    }
    return ScriptManagerController.instance;
  }

  private registerHandlers(): void {
    ipcMain.handle('scriptManager/convert-to-xml', this.handleConvertToXml.bind(this));
  }

  private async handleConvertToXml(_event: IpcMainInvokeEvent, script: string) {
    return await this.scriptManagerService.convertToXml(script);
  }
}