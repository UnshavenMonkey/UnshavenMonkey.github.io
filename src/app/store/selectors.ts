import { CartProduct } from '../../shared/data/products';
import { RootState } from './store';

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsInitialized = (state: RootState) => state.auth.initialized;
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectIsAuthorized = (state: RootState) => Boolean(state.auth.token);
export const selectIsAdmin = (state: RootState) => state.auth.profile?.role === 'admin';
export const selectProducts = (state: RootState) => state.products.items;

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
