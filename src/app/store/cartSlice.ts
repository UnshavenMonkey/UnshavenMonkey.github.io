import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemState } from './types';

interface CartState {
  items: CartItemState[];
  orderLoading: boolean;
  orderError: string | null;
  orderSuccess: boolean;
}

const initialState: CartState = {
  items: [],
  orderLoading: false,
  orderError: null,
  orderSuccess: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      state.orderSuccess = false;
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
    orderCreateRequested(state) {
      state.orderLoading = true;
      state.orderError = null;
      state.orderSuccess = false;
    },
    orderCreateSucceeded(state) {
      state.items = [];
      state.orderLoading = false;
      state.orderSuccess = true;
    },
    orderCreateFailed(state, action: PayloadAction<string>) {
      state.orderLoading = false;
      state.orderError = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
