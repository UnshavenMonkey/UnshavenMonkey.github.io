import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemState } from './types';

interface CartState {
  items: CartItemState[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.productId === action.payload);

      if (item) {
        item.count += 1;
        return;
      }

      state.items.push({ productId: action.payload, count: 1 });
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
  },
});

export const cartActions = cartSlice.actions;
