import React, { ReactNode } from 'react';
import { Home, Repeat, Scan, History, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  activeTab?: 'home' | 'transfer' | 'scan' | 'history' | 'profile';
  onNavigate: (tab: 'home' | 'transfer' | 'scan' | 'history' | 'profile') => void;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onNavigate, showNav = true }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 pb-20">
          {children}
        </main>
        
        {showNav && (
          <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <NavItem 
              icon={<Home size={24} />} 
              label="Accueil" 
              active={activeTab === 'home'} 
              onClick={() => onNavigate('home')} 
            />
            <NavItem 
              icon={<Repeat size={24} />} 
              label="Transfert" 
              active={activeTab === 'transfer'} 
              onClick={() => onNavigate('transfer')} 
            />
            <div className="relative -top-6">
              <button 
                onClick={() => onNavigate('scan')}
                className="bg-primary hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-primary/40 transition-transform active:scale-95 flex items-center justify-center border-4 border-gray-50"
              >
                <Scan size={28} />
              </button>
            </div>
            <NavItem 
              icon={<History size={24} />} 
              label="Historique" 
              active={activeTab === 'history'} 
              onClick={() => onNavigate('history')} 
            />
            <NavItem 
              icon={<User size={24} />} 
              label="Profil" 
              active={activeTab === 'profile'} 
              onClick={() => onNavigate('profile')} 
            />
          </nav>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);