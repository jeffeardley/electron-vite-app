import React from 'react';
import Header from './components/common/Header/Header';
import { Home, Settings, User } from 'lucide-react';

const App: React.FC = () => {
  const navItems = [
    {
      label: 'Home',
      icon: Home,
      onClick: () => console.log('Home clicked')
    },
    {
      label: 'Profile',
      icon: User,
      onClick: () => console.log('Profile clicked')
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => console.log('Settings clicked')
    }
  ];

  return (
    <div>
      <Header
        appName="My Electron App"
        navItems={navItems}
        onLogoClick={() => console.log('Logo clicked')}
      />
      {/* Rest of your app content */}
    </div>
  );
};

export default App;