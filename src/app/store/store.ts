import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { authSlice } from './authSlice';
import { cartSlice } from './cartSlice';
import { productsSlice } from './productsSlice';
import { rootSaga } from './rootSaga';
import { signupApi } from './signupApi';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    [signupApi.reducerPath]: signupApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signupApi.middleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
