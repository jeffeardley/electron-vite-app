import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Folder } from 'lucide-react';
import Header from './components/common/Header/Header';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';

const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  const navItems = [
    {
      label: 'Home',
      icon: Home,
      onClick: () => navigate('/')
    },
    {
      label: 'Project',
      icon: Folder,
      onClick: () => navigate('/project-page')
    }
  ];
  return (
    <>
      <Header appName="My Electron App" navItems={navItems} onLogoClick={() => navigate('/')} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project-page" element={<ProjectPage />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;