export type UserRole = 'user' | 'admin';

export interface Profile {
  id?: string;
  name: string;
  email: string;
  signUpDate?: string;
  commandId?: string;
  role: UserRole;
}

export interface CartItemState {
  productId: string;
  count: number;
}
