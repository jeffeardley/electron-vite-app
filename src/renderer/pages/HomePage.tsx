import React from 'react';
import ProjectList from '../components/features/ProjectList/ProjectList';
const { ipcRenderer } = window.require('electron');

const HomePage: React.FC = () => {
  const handleNewProjectClick = async () => {
    try {
      // You can pass the desired project name; here it's hard-coded
      const newProject = await ipcRenderer.invoke('new-project', 'New Project');
      console.log('Project created:', newProject);
      // Optionally, update your local state with newProject data
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
        projects={[{ id: '1', name: 'Project 1' }, { id: '2', name: 'Project 2' }]}
        onProjectClick={(id) => console.log(`Project clicked: ${id}`)}
        onNewProjectClick={handleNewProjectClick}
      />
    </div>
  );
};

export default HomePage;