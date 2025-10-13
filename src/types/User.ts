export type UserRole = 'user' | 'driver' | 'moderator' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  createdAt?: string; // ISO
  role?: UserRole;    // default 'user'
}

export interface UsersResponse {
  data: User[];
  page: number;
  limit: number;
  total: number;
}
