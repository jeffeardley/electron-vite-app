import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Folder } from 'lucide-react';
import Header from './components/common/Header/Header';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import ProjectCreationPage from './pages/ProjectCreationPage';

const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const allNavItems = [
    {
      label: 'Home',
      icon: Home,
      onClick: () => navigate('/')
    },
  ];

  const navItems = allNavItems.filter(item => {
    if (item.label === 'Home' && location.pathname === '/') {
      return false;
    }
    if (item.label === 'Project' && location.pathname === '/project-page') {
      return false;
    }
    return true;
  });
  
  return (
    <>
      <Header appName="My Electron App" navItems={navItems} onLogoClick={() => navigate('/')} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project-page" element={<ProjectPage />} />
        <Route path="/project-creation-page" element={<ProjectCreationPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
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