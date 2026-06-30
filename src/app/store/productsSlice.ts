import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../shared/data/products';
import { ServerCategory } from '../../shared/api/shop';

export interface ProductFormValues {
  id?: string;
  title: string;
  categoryId: string;
  categoryName: string;
  price: string;
  image: string;
  description: string;
}

interface ProductsState {
  items: Product[];
  categories: ServerCategory[];
  pageNumber: number;
  pageSize: number;
  total: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  saving: boolean;
  saveError: string | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  pageNumber: 0,
  pageSize: 8,
  total: 0,
  loading: false,
  loadingMore: false,
  error: null,
  saving: false,
  saveError: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsLoadRequested(state) {
      state.loading = true;
      state.error = null;
      state.pageNumber = 0;
    },
    productsNextPageRequested(state) {
      if (state.loading || state.loadingMore || (state.total > 0 && state.items.length >= state.total)) {
        return;
      }

      state.loadingMore = true;
      state.error = null;
    },
    productsLoaded(
      state,
      action: PayloadAction<{ items: Product[]; pageNumber: number; total: number; append: boolean }>
    ) {
      state.items = action.payload.append ? [...state.items, ...action.payload.items] : action.payload.items;
      state.pageNumber = action.payload.pageNumber;
      state.total = action.payload.total;
      state.loading = false;
      state.loadingMore = false;
    },
    productsLoadFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.loadingMore = false;
      state.error = action.payload;
    },
    categoriesLoaded(state, action: PayloadAction<ServerCategory[]>) {
      state.categories = action.payload;
    },
    productSaveRequested(state, _action: PayloadAction<{ mode: 'create' | 'edit'; values: ProductFormValues }>) {
      state.saving = true;
      state.saveError = null;
    },
    productSaved(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((product) => product.id === action.payload.id);

      if (index === -1) {
        state.items.unshift(action.payload);
        state.total += 1;
      } else {
        state.items[index] = action.payload;
      }

      state.saving = false;
      state.saveError = null;
    },
    productSaveFailed(state, action: PayloadAction<string>) {
      state.saving = false;
      state.saveError = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;
