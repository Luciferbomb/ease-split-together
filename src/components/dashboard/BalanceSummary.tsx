
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store';
import { mockCurrentUser, mockUsers } from '@/data/mockUsers';

const BalanceSummary = () => {
  const { expenses, settlements } = useStore();
  
  // Calculate how much the current user is owed
  const calculateTotalOwed = () => {
    let total = 0;
    
    // Check expenses where others owe the current user
    expenses.forEach(expense => {
      if (expense.paidBy === mockCurrentUser.id) {
        expense.splits.forEach(split => {
          if (split.userId !== mockCurrentUser.id && !split.settled) {
            total += split.amount;
          }
        });
      }
    });
    
    return total;
  };
  
  // Calculate how much the current user owes others
  const calculateTotalOwe = () => {
    let total = 0;
    
    // Check expenses where the current user owes others
    expenses.forEach(expense => {
      if (expense.paidBy !== mockCurrentUser.id) {
        expense.splits.forEach(split => {
          if (split.userId === mockCurrentUser.id && !split.settled) {
            total += split.amount;
          }
        });
      }
    });
    
    return total;
  };
  
  const totalOwed = calculateTotalOwed();
  const totalOwe = calculateTotalOwe();
  const netBalance = totalOwed - totalOwe;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-muted-foreground">You are owed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowDown className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-2xl font-bold text-green-500">${totalOwed.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-muted-foreground">You owe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowUp className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-2xl font-bold text-red-500">${totalOwe.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-muted-foreground">Total balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {netBalance >= 0 ? (
              <>
                <ArrowDown className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-green-500">${netBalance.toFixed(2)}</span>
              </>
            ) : (
              <>
                <ArrowUp className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-2xl font-bold text-red-500">${Math.abs(netBalance).toFixed(2)}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSummary;
