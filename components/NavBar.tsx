import React from 'react';
import { Logo } from './Logo';
import { View } from '../types';

interface NavBarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onLoginClick: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, onNavigate, onLoginClick }) => {
  const navItems: { label: string; view: View }[] = [
    { label: 'Platform', view: 'PLATFORM' },
    { label: 'API', view: 'API' },
    { label: 'Enterprise', view: 'ENTERPRISE' },
  ];

  return (
    <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-top-4 duration-500">
      <div 
        onClick={() => onNavigate('LANDING')} 
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <Logo size={28} />
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`transition-colors ${
              currentView === item.view 
                ? 'text-emerald-400' 
                : 'hover:text-emerald-400'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button 
          onClick={onLoginClick}
          className="text-white hover:text-emerald-400 transition-colors font-mono border border-slate-700 hover:border-emerald-500/50 rounded px-4 py-2 bg-slate-800/50"
        >
          LOGIN_
        </button>
      </div>
    </nav>
  );
};