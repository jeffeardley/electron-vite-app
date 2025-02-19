import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ProjectData } from './types';
const { ipcRenderer } = window.require('electron');

const ProjectPage: React.FC = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const [project, setProject] = useState<ProjectData | null>(
    (location.state as { project: ProjectData })?.project || null
  );

  useEffect(() => {
    if (!project && projectId) {
      ipcRenderer.invoke('get-project', projectId)
        .then((projectData: ProjectData) => setProject(projectData))
        .catch((error: Error) => console.error('Error fetching project:', error));
    }
  }, [project, projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Project: {project.name}</h1>
    </div>
  );
};

export default ProjectPage;