
import React from 'react';
import { useStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CreditCard } from 'lucide-react';
import { mockCurrentUser, mockUsers } from '@/data/mockUsers';

const Settlements = () => {
  const { expenses, settlements } = useStore();
  
  // Calculate balances with each user (similar to SettlementSummary component)
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
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Settlements</h1>
      
      <div className="space-y-8">
        {/* You owe section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">You Owe</h2>
          {balances.filter(b => b.amount < 0).length > 0 ? (
            <div className="space-y-4">
              {balances
                .filter(balance => balance.amount < 0)
                .map(({ userId, amount }) => (
                <Card key={userId}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
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
                          <p className="text-sm text-red-500">you owe ${Math.abs(amount)}</p>
                        </div>
                      </div>
                      <Button size="sm">Pay</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't owe anyone</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* You are owed section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">You are Owed</h2>
          {balances.filter(b => b.amount > 0).length > 0 ? (
            <div className="space-y-4">
              {balances
                .filter(balance => balance.amount > 0)
                .map(({ userId, amount }) => (
                <Card key={userId}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
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
                          <p className="text-sm text-green-500">owes you ${amount}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Remind</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No one owes you</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Settlement history */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Settlement History</h2>
            <Button variant="outline" size="sm">
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          {settlements.length > 0 ? (
            <div className="space-y-4">
              {settlements.map(settlement => (
                <Card key={settlement.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {getUserName(settlement.fromUser)} paid {getUserName(settlement.toUser)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${settlement.amount} • {settlement.status}
                        </p>
                      </div>
                      <div className={`text-sm ${
                        settlement.status === 'completed' ? 'text-green-500' : 
                        settlement.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                      }`}>
                        {settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No settlements yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settlements;
