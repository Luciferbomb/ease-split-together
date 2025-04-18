
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { mockCurrentUser, mockUsers } from '@/data/mockUsers';

const SettlementSummary = () => {
  const { expenses } = useStore();
  
  // Calculate balances with each user
  const calculateBalances = () => {
    const balances = new Map();
    
    expenses.forEach(expense => {
      const paidBy = expense.paidBy;
      
      expense.splits.forEach(split => {
        if (!split.settled) {
          const userId = split.userId;
          
          // Skip if it's the current user's own payment
          if (paidBy === userId) return;
          
          // If current user paid
          if (paidBy === mockCurrentUser.id && userId !== mockCurrentUser.id) {
            const currentBalance = balances.get(userId) || 0;
            balances.set(userId, currentBalance + split.amount);
          }
          
          // If someone else paid and current user owes
          if (paidBy !== mockCurrentUser.id && userId === mockCurrentUser.id) {
            const currentBalance = balances.get(paidBy) || 0;
            balances.set(paidBy, currentBalance - split.amount);
          }
        }
      });
    });
    
    // Convert to array for rendering
    return Array.from(balances.entries()).map(([userId, amount]) => ({
      userId,
      amount: Number(amount.toFixed(2))
    })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
  };
  
  const balances = calculateBalances();
  
  const getUserName = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.displayName : 'Unknown User';
  };
  
  const getUserPhoto = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user?.photoURL;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Settlements</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/settlements">
            View All <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {balances.length > 0 ? (
          <div className="space-y-4">
            {balances.map(({ userId, amount }) => (
              <div key={userId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getUserPhoto(userId) ? (
                    <img 
                      src={getUserPhoto(userId)} 
                      alt={getUserName(userId)}
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {getUserName(userId).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{getUserName(userId)}</p>
                    {amount > 0 ? (
                      <p className="text-sm text-green-500">owes you ${Math.abs(amount)}</p>
                    ) : (
                      <p className="text-sm text-red-500">you owe ${Math.abs(amount)}</p>
                    )}
                  </div>
                </div>
                <Button size="sm" variant={amount > 0 ? "outline" : "default"}>
                  {amount > 0 ? 'Remind' : 'Pay'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No pending settlements</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SettlementSummary;
