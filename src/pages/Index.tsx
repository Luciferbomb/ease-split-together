
import React from 'react';
import { useStore } from '@/store';
import { mockCurrentUser } from '@/data/mockUsers';
import BalanceSummary from '@/components/dashboard/BalanceSummary';
import GroupSummary from '@/components/dashboard/GroupSummary';
import RecentActivity from '@/components/dashboard/RecentActivity';
import SettlementSummary from '@/components/dashboard/SettlementSummary';

const Index = () => {
  const { login } = useStore();
  
  // Auto-login the mock user for the demo
  React.useEffect(() => {
    login(mockCurrentUser);
  }, [login]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {mockCurrentUser.displayName}
        </p>
      </div>
      
      <BalanceSummary />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GroupSummary />
        <SettlementSummary />
      </div>
      
      <RecentActivity />
    </div>
  );
};

export default Index;
