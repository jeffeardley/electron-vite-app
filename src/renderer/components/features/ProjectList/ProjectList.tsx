import React from 'react';
import { ProjectListProps } from './types';
// import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick, onNewProjectClick }) => {
//   const navigate = useNavigate();

  return (
    <div>
      <h2>Projects</h2>
      <button onClick={onNewProjectClick}>
        <Plus />
        New Project
      </button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => onProjectClick(project.id)}>
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;