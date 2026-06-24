import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ApiError, createOrder } from '../../shared/api/shop';
import { cartActions } from './cartSlice';
import { selectCartItems, selectToken } from './selectors';
import { CartItemState } from './types';

const getErrorMessage = (error: unknown) => {
  const payload = error instanceof ApiError ? error.payload : error;

  if (payload && typeof payload === 'object' && 'errors' in payload) {
    const errors = (payload as { errors?: Array<{ message?: string }> }).errors;
    return errors?.[0]?.message || 'Сервер вернул ошибку.';
  }

  return 'Не удалось создать заказ. Попробуйте позже.';
};

function* handleOrderCreate() {
  const token: string | null = yield select(selectToken);
  const items: CartItemState[] = yield select(selectCartItems);

  if (!token) {
    yield put(cartActions.orderCreateFailed('Для создания заказа нужно войти.'));
    return;
  }

  if (items.length === 0) {
    yield put(cartActions.orderCreateFailed('Корзина пустая.'));
    return;
  }

  try {
    yield call(createOrder, token, {
      products: items.map((item) => ({
        id: item.productId,
        quantity: item.count,
      })),
    });
    yield put(cartActions.orderCreateSucceeded());
  } catch (error) {
    yield put(cartActions.orderCreateFailed(getErrorMessage(error)));
  }
}

export function* cartSaga() {
  yield takeEvery(cartActions.orderCreateRequested.type, handleOrderCreate);
}
