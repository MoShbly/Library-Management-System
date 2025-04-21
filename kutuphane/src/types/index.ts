export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
  isbn: string;
  publishDate: string;
  description: string;
  coverImage?: string;
  totalCopies: number;
  availableCopies: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  role: 'user' | 'admin' | 'librarian';
  borrowedBooks: BorrowedBook[];
  reservations: Reservation[];
  notifications: Notification[];
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  title: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  fine?: number;
}

export interface Reservation {
  id: string;
  bookId: string;
  title: string;
  reservationDate: string;
  status: 'pending' | 'ready' | 'cancelled';
  notificationSent: boolean;
}

export interface Notification {
  id: string;
  type: 'due_date' | 'reservation' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Statistics {
  totalBooks: number;
  totalUsers: number;
  activeBorrows: number;
  overdueBooks: number;
  popularCategories: {
    category: string;
    count: number;
  }[];
  recentActivity: {
    type: string;
    description: string;
    date: string;
  }[];
}

export interface NavigationProps {
  navigation: any;
  route?: any;
} 