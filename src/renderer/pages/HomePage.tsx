import React, { useState, useEffect } from 'react';
import ProjectList from '../components/features/ProjectList/ProjectList';
const { ipcRenderer } = window.require('electron');

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await ipcRenderer.invoke('get-projects');
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      }
    };
    
    loadProjects();
  }, []);

  const handleNewProjectClick = async () => {
    try {
      const newProject = await ipcRenderer.invoke('new-project', 'New Project');
      console.log('Project created:', newProject);
      // Refresh projects after creating a new one
      const updatedProjects = await ipcRenderer.invoke('get-projects');
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My Electron App</h1>
      <p>
        This is the homepage. Use the navigation above to visit different pages or explore the application.
      </p>
      <ProjectList
        projects={projects}
        onProjectClick={(id) => console.log(`Project clicked: ${id}`)}
        onNewProjectClick={handleNewProjectClick}
      />
    </div>
  );
};

export default HomePage;