import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, products } from '../../shared/data/products';

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: products,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    upsertProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((product) => product.id === action.payload.id);

      if (index === -1) {
        state.items.unshift(action.payload);
        return;
      }

      state.items[index] = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;
