export interface ProjectListProps {
    projects: { id: string; name: string }[];
    onProjectClick: (projectId: string) => void;
    onNewProjectClick: () => void;
}