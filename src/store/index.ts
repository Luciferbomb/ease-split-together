import { create } from 'zustand';

export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: {
    userId: string;
    role: 'admin' | 'member';
  }[];
  defaultSplitMethod: 'equal' | 'percentage' | 'shares' | 'exact';
  image?: string;
  groupCurrency: string;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  date: Date;
  category: string;
  receipt?: string;
  notes?: string;
  splits: {
    userId: string;
    amount: number;
    settled: boolean;
    settledAt?: Date;
  }[];
  tags?: string[];
}

export interface Settlement {
  id: string;
  groupId: string;
  fromUser: string;
  toUser: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'declined';
  method?: string;
}

interface SpliteaseState {
  // Auth state
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // App data
  groups: Group[];
  expenses: Expense[];
  settlements: Settlement[];
  
  // UI state
  isLoading: boolean;
  activeGroupId: string | null;
  
  // Navigation state
  navbarOpen: boolean;
  toggleNavbar: () => void;
  
  // Example actions
  login: (user: User) => void;
  logout: () => void;
  createGroup: (group: Omit<Group, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
}

export const useStore = create<SpliteaseState>((set) => ({
  // Initial auth state
  currentUser: null,
  isAuthenticated: false,
  
  // App data - starting with mock data
  groups: [
    {
      id: '1',
      name: 'Summer Trip',
      description: 'Our beach vacation expenses',
      members: [
        { userId: 'user1', role: 'admin' },
        { userId: 'user2', role: 'member' },
        { userId: 'user3', role: 'member' }
      ],
      defaultSplitMethod: 'equal',
      groupCurrency: 'USD',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=300&h=300'
    },
    {
      id: '2',
      name: 'Apartment',
      description: 'Shared apartment expenses',
      members: [
        { userId: 'user1', role: 'admin' },
        { userId: 'user2', role: 'member' }
      ],
      defaultSplitMethod: 'equal',
      groupCurrency: 'USD',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&h=300'
    }
  ],
  expenses: [
    {
      id: '1',
      groupId: '1',
      description: 'Dinner at beachside restaurant',
      amount: 120,
      currency: 'USD',
      paidBy: 'user1',
      date: new Date('2023-07-15'),
      category: 'Food',
      splits: [
        { userId: 'user1', amount: 40, settled: true },
        { userId: 'user2', amount: 40, settled: false },
        { userId: 'user3', amount: 40, settled: false }
      ]
    },
    {
      id: '2',
      groupId: '1',
      description: 'Beach house rental',
      amount: 600,
      currency: 'USD',
      paidBy: 'user2',
      date: new Date('2023-07-12'),
      category: 'Accommodation',
      splits: [
        { userId: 'user1', amount: 200, settled: false },
        { userId: 'user2', amount: 200, settled: true },
        { userId: 'user3', amount: 200, settled: true }
      ]
    },
    {
      id: '3',
      groupId: '2',
      description: 'Internet bill',
      amount: 60,
      currency: 'USD',
      paidBy: 'user1',
      date: new Date('2023-08-01'),
      category: 'Utilities',
      splits: [
        { userId: 'user1', amount: 30, settled: true },
        { userId: 'user2', amount: 30, settled: false }
      ]
    }
  ],
  settlements: [
    {
      id: '1',
      groupId: '1',
      fromUser: 'user1',
      toUser: 'user2',
      amount: 200,
      currency: 'USD',
      status: 'pending'
    },
    {
      id: '2',
      groupId: '2',
      fromUser: 'user2',
      toUser: 'user1',
      amount: 30,
      currency: 'USD',
      status: 'completed',
      method: 'Venmo'
    }
  ],
  
  // UI state
  isLoading: false,
  activeGroupId: '1',
  
  // Navigation state
  navbarOpen: false,
  toggleNavbar: () => set((state) => ({ navbarOpen: !state.navbarOpen })),
  
  // Example actions
  login: (user) => set({ currentUser: user, isAuthenticated: true }),
  logout: () => set({ currentUser: null, isAuthenticated: false }),
  createGroup: (group) => set((state) => ({ 
    groups: [...state.groups, { ...group, id: `group-${Date.now()}` }] 
  })),
  addExpense: (expense) => set((state) => ({ 
    expenses: [...state.expenses, { ...expense, id: `expense-${Date.now()}` }] 
  }))
}));
