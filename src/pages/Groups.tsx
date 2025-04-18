
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Users } from 'lucide-react';

const Groups = () => {
  const { groups } = useStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Groups</h1>
        <Button asChild>
          <Link to="/groups/new">
            <PlusCircle className="h-4 w-4 mr-2" /> New Group
          </Link>
        </Button>
      </div>
      
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map(group => (
            <Link key={group.id} to={`/groups/${group.id}`}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  {group.image ? (
                    <img 
                      src={group.image} 
                      alt={group.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary/50" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {group.description || `${group.members.length} members`}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Groups Yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6">
            Groups help you organize expenses with friends, roommates, trips, or anything else.
          </p>
          <Button asChild>
            <Link to="/groups/new">Create Your First Group</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Groups;
