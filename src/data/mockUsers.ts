
export interface MockUser {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber?: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user1',
    displayName: 'Alex Johnson',
    email: 'alex@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=alex',
    phoneNumber: '+1234567890'
  },
  {
    id: 'user2',
    displayName: 'Taylor Smith',
    email: 'taylor@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=taylor'
  },
  {
    id: 'user3',
    displayName: 'Jordan Lee',
    email: 'jordan@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=jordan'
  },
  {
    id: 'user4',
    displayName: 'Casey Wong',
    email: 'casey@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=casey'
  }
];

export const mockCurrentUser = mockUsers[0];
