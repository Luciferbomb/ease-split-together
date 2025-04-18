
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';

const GroupSummary = () => {
  const { groups } = useStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Groups</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/groups/new">
            <PlusCircle className="h-4 w-4 mr-2" /> New Group
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <Link 
              key={group.id} 
              to={`/groups/${group.id}`}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary transition-colors"
            >
              {group.image ? (
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-12 h-12 rounded-md object-cover" 
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              )}
              <div>
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-muted-foreground">{group.description || `${group.members.length} members`}</p>
              </div>
            </Link>
          ))}
          
          {groups.length === 0 && (
            <div className="text-center py-4">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground mb-2">No groups yet</p>
              <Button asChild>
                <Link to="/groups/new">Create Your First Group</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupSummary;
