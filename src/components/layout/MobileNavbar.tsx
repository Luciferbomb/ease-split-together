
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PlusCircle, Receipt, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Groups', path: '/groups', icon: Users },
    { name: 'Add', path: '/expenses/add', icon: PlusCircle },
    { name: 'Activity', path: '/expenses', icon: Receipt },
    { name: 'Balances', path: '/settlements', icon: CreditCard },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card h-16 flex items-center shadow-sm">
      <div className="flex w-full justify-around items-center px-2">
        {navItems.map((item) => {
          const isActive = item.path === location.pathname;
          
          // Special styling for the "Add" button in the middle
          if (item.name === 'Add') {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center -mt-6 shadow-lg"
              >
                <item.icon className="text-white" />
              </Link>
            );
          }
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center px-3 py-1"
            >
              <item.icon className={cn(
                "w-5 h-5 mb-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs",
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavbar;
