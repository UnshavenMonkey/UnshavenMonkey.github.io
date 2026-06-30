export type UserRole = 'user' | 'admin';

export interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: UserRole;
}

export interface CartItemState {
  productId: string;
  count: number;
}
