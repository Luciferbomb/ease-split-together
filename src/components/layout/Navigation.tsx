
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, CreditCard, Receipt, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store';
import { mockCurrentUser } from '@/data/mockUsers';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Groups', path: '/groups', icon: Users },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Settlements', path: '/settlements', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="h-full px-4 py-6 flex flex-col">
        <div className="flex items-center mb-8 px-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold">SplitEase</span>
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="mb-8 px-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={mockCurrentUser.photoURL} 
                  alt={mockCurrentUser.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{mockCurrentUser.displayName}</p>
                <p className="text-sm text-muted-foreground">{mockCurrentUser.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="pt-4 mt-auto">
          <button
            className="flex items-center text-sm space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
