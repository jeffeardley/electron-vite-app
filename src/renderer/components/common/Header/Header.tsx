import React from 'react';
import { HeaderProps, NavItem } from './types';
import { Home } from 'lucide-react';

const defaultNavItems: NavItem[] = [
  {
    label: 'Home',
    icon: Home,
    onClick: () => console.log('Home clicked')
  }
];

const Header: React.FC<HeaderProps> = ({
  appName = 'MyApp',
  navItems = defaultNavItems,
  onLogoClick
}) => {
  return (
    <header>
      <div>
        <div>
          {/* Logo/Brand */}
          <div>
            <button 
              onClick={onLogoClick}
            >
              {appName}
            </button>
          </div>
          
          {/* Navigation */}
          <nav>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                >
                  <Icon />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;