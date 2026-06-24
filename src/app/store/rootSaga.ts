import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { cartSaga } from './cartSaga';
import { productsSaga } from './productsSaga';

export function* rootSaga() {
  yield all([authSaga(), productsSaga(), cartSaga()]);
}
