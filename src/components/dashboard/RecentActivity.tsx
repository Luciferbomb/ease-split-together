
import React from 'react';
import { useStore } from '@/store';
import { mockUsers } from '@/data/mockUsers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, CreditCard, User } from 'lucide-react';
import { format } from 'date-fns';

const RecentActivity = () => {
  const { expenses, settlements } = useStore();
  
  const getUserName = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.displayName : 'Unknown User';
  };
  
  // Combine expenses and settlements for activity feed
  const activities = [
    ...expenses.map(expense => ({
      id: expense.id,
      type: 'expense',
      date: expense.date,
      description: expense.description,
      amount: expense.amount,
      currency: expense.currency,
      paidBy: expense.paidBy,
      groupId: expense.groupId
    })),
    ...settlements.map(settlement => ({
      id: settlement.id,
      type: 'settlement',
      date: new Date(), // In a real app, we'd have createdAt
      description: `Payment from ${getUserName(settlement.fromUser)} to ${getUserName(settlement.toUser)}`,
      amount: settlement.amount,
      currency: settlement.currency,
      fromUser: settlement.fromUser,
      toUser: settlement.toUser,
      status: settlement.status,
      groupId: settlement.groupId
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'expense':
        return <Receipt className="h-4 w-4 text-blue-500" />;
      case 'settlement':
        return <CreditCard className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="flex items-start space-x-4">
              <div className="bg-secondary rounded-full p-2 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">
                  {activity.type === 'expense' 
                    ? `${getUserName(activity.paidBy)} paid ${activity.currency} ${activity.amount}`
                    : activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.type === 'expense' ? activity.description : 
                    activity.status === 'completed' ? 'Payment completed' : 'Payment pending'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(activity.date, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          ))}
          
          {activities.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
