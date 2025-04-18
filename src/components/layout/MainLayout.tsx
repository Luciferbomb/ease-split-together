
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import MobileNavbar from './MobileNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStore } from '@/store';

const MainLayout = () => {
  const isMobile = useIsMobile();
  const { navbarOpen, toggleNavbar } = useStore();
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && <Navigation />}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 px-4 pb-16 pt-4 md:px-6">
          <Outlet />
        </main>
        
        {/* Mobile bottom navbar */}
        {isMobile && <MobileNavbar />}
      </div>
    </div>
  );
};

export default MainLayout;
