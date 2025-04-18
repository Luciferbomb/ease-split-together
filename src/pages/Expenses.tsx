
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Receipt, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { mockUsers } from '@/data/mockUsers';

const Expenses = () => {
  const { expenses, groups } = useStore();
  
  const getGroupName = (groupId: string) => {
    const group = groups.find(group => group.id === groupId);
    return group ? group.name : 'Unknown Group';
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.displayName : 'Unknown User';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <Button asChild>
          <Link to="/expenses/add">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Expense
          </Link>
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {expenses.length} expenses
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>
      
      {expenses.length > 0 ? (
        <div className="space-y-4">
          {expenses.map(expense => (
            <Card key={expense.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {getUserName(expense.paidBy)} paid ${expense.amount} • {format(expense.date, 'MMM d, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getGroupName(expense.groupId)} • {expense.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${expense.amount}</div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/expenses/${expense.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Receipt className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Expenses Yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6">
            Start tracking your shared expenses by adding your first expense.
          </p>
          <Button asChild>
            <Link to="/expenses/add">Add Your First Expense</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Expenses;
