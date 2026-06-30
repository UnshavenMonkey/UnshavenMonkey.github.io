import { CartProduct } from '../../shared/data/products';
import { RootState } from './store';

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsInitialized = (state: RootState) => state.auth.initialized;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectProfileSaving = (state: RootState) => state.auth.profileSaving;
export const selectProfileError = (state: RootState) => state.auth.profileError;
export const selectIsAuthorized = (state: RootState) => Boolean(state.auth.token);
export const selectIsAdmin = (state: RootState) => Boolean(state.auth.token);
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsLoadingMore = (state: RootState) => state.products.loadingMore;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsHasMore = (state: RootState) =>
  state.products.total === 0 || state.products.items.length < state.products.total;
export const selectProductsPageNumber = (state: RootState) => state.products.pageNumber;
export const selectProductsPageSize = (state: RootState) => state.products.pageSize;
export const selectProductCategories = (state: RootState) => state.products.categories;
export const selectProductSaving = (state: RootState) => state.products.saving;
export const selectProductSaveError = (state: RootState) => state.products.saveError;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectOrderLoading = (state: RootState) => state.cart.orderLoading;
export const selectOrderError = (state: RootState) => state.cart.orderError;
export const selectOrderSuccess = (state: RootState) => state.cart.orderSuccess;

export const selectCartProducts = (state: RootState): CartProduct[] =>
  state.cart.items
    .map((cartItem) => {
      const product = state.products.items.find((item) => item.id === cartItem.productId);

      if (!product) {
        return null;
      }

      return { ...product, count: cartItem.count };
    })
    .filter((product): product is CartProduct => product !== null);

export const selectCartCountByProductId = (state: RootState, productId: string) =>
  state.cart.items.find((item) => item.productId === productId)?.count ?? 0;
