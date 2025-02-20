import { DatabaseService } from '../services/databaseService';

export class StateManagerService {
    private static instance: StateManagerService;
    private db: DatabaseService;
    
    private constructor() {
        this.db = DatabaseService.getInstance();
    }
    
    public static getInstance(): StateManagerService {
        if (!StateManagerService.instance) {
        StateManagerService.instance = new StateManagerService();
        }
        return StateManagerService.instance;
    }
    
    public async createNewProject(projectName: string): Promise<{ id: number; name: string }> {
        const project = await this.db.addProject(projectName);
        return project;
    }
    
    public async getProjects(): Promise<Array<{ id: number; name: string }>> {
        const projects = await this.db.getProjects();
        return projects;
    }
    
    public async deleteProject(projectId: string): Promise<void> {
        await this.db.deleteProject(projectId);
    }
    
    public async getProject(projectId: string): Promise<{ id: string; name: string }> {
        const project = await this.db.getProject(projectId);
        return project;
    }
}