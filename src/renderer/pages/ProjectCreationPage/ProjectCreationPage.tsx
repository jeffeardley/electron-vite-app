import React, { useState } from 'react';
import { TextInput } from '../../components/common';
import { FileUpload } from '../../components/common';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

const ProjectCreationPage: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const navigate = useNavigate();

    const handleNewProjectCreation = async () => {
        if (!projectName.trim()) {
            alert('Please enter a project name');
            return;
        }

        try {
            const newProject = await ipcRenderer.invoke('new-project', projectName);
            console.log('Project created:', newProject);
            navigate(`/project-page/${newProject.id}`, {
                state: { project: newProject }
            });
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Let's start a project!</h1>
            <TextInput 
                label="Project Name" 
                value={projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
            />
            <FileUpload label="Media File" />
            <FileUpload label="Transcript File" />
            <button onClick={handleNewProjectCreation}>Create Project</button>
        </div>
    );
};

export default ProjectCreationPage;