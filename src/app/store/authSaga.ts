import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { Profile, UserRole } from './types';

const TOKEN_STORAGE_KEY = 'otus-shop-token';

const createFakeProfile = (token: string): Profile => {
  const role: UserRole = token.includes('admin') ? 'admin' : 'user';

  return {
    name: role === 'admin' ? 'Admin User' : 'Alexey Ivanov',
    email: role === 'admin' ? 'admin@example.com' : 'alexey@example.com',
    phone: '+7 999 123-45-67',
    address: 'Moscow, Lesnaya st., 12',
    role,
  };
};

const getSavedToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
const saveToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

function* syncProfile(token: string | null) {
  yield put(authActions.profileLoaded(token ? createFakeProfile(token) : null));
}

function* handleAppStarted() {
  const token: string | null = yield call(getSavedToken);

  yield put(authActions.tokenLoaded(token));
  yield call(syncProfile, token);
  yield put(authActions.appInitialized());
}

function* handleLogin(action: PayloadAction<UserRole>) {
  const token = `fake-${action.payload}-token-${Date.now()}`;

  yield call(saveToken, token);
  yield put(authActions.tokenLoaded(token));
  yield call(syncProfile, token);
}

function* handleLogout() {
  yield call(clearToken);
  yield put(authActions.tokenLoaded(null));
  yield call(syncProfile, null);
}

function* handleStorageTokenChange(action: PayloadAction<string | null>) {
  yield call(syncProfile, action.payload);
}

export function* authSaga() {
  yield takeEvery(authActions.appStarted.type, handleAppStarted);
  yield takeEvery(authActions.loginRequested.type, handleLogin);
  yield takeEvery(authActions.logoutRequested.type, handleLogout);
  yield takeEvery(authActions.tokenChangedFromStorage.type, handleStorageTokenChange);
}

export { TOKEN_STORAGE_KEY };
