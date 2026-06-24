import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ApiError, getProfile, signIn, updateProfile } from '../../shared/api/shop';
import { authActions, AuthCredentials } from './authSlice';
import { selectToken } from './selectors';
import { Profile } from './types';

const TOKEN_STORAGE_KEY = 'otus-shop-token';

const getSavedToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
const saveToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

const getErrorMessage = (error: unknown) => {
  const payload = error instanceof ApiError ? error.payload : error;

  if (payload && typeof payload === 'object' && 'errors' in payload) {
    const errors = (payload as { errors?: Array<{ message?: string; extensions?: { code?: string } }> }).errors;
    const code = errors?.[0]?.extensions?.code;

    if (code === 'ERR_INCORRECT_EMAIL_OR_PASSWORD') {
      return 'Неверный email или пароль.';
    }

    if (code === 'ERR_FIELD_REQUIRED') {
      return errors?.[0]?.message || 'Заполните обязательные поля.';
    }

    return errors?.[0]?.message || 'Сервер вернул ошибку.';
  }

  return 'Не удалось выполнить запрос. Попробуйте позже.';
};

const mapProfile = (profile: Awaited<ReturnType<typeof getProfile>>): Profile => ({
  id: profile.id,
  name: profile.name || profile.email,
  email: profile.email,
  signUpDate: profile.signUpDate,
  commandId: profile.commandId,
  role: 'user',
});

function* handleAppStarted() {
  const token: string | null = yield call(getSavedToken);

  yield put(authActions.tokenLoaded(token));

  if (token) {
    try {
      const profile: Awaited<ReturnType<typeof getProfile>> = yield call(getProfile, token);
      yield put(authActions.profileLoaded(mapProfile(profile)));
    } catch {
      yield call(clearToken);
      yield put(authActions.tokenLoaded(null));
      yield put(authActions.profileLoaded(null));
    }
  }

  yield put(authActions.appInitialized());
}

function* handleLogin(action: PayloadAction<AuthCredentials>) {
  try {
    const authResult: Awaited<ReturnType<typeof signIn>> = yield call(signIn, action.payload);
    yield call(saveToken, authResult.token);

    const profile: Awaited<ReturnType<typeof getProfile>> = yield call(getProfile, authResult.token);
    yield put(authActions.loginSucceeded({ token: authResult.token, profile: mapProfile(profile) }));
  } catch (error) {
    yield put(authActions.loginFailed(getErrorMessage(error)));
  }
}

function* handleLogout() {
  yield call(clearToken);
  yield put(authActions.tokenLoaded(null));
  yield put(authActions.profileLoaded(null));
}

function* handleStorageTokenChange(action: PayloadAction<string | null>) {
  if (!action.payload) {
    yield put(authActions.profileLoaded(null));
    return;
  }

  try {
    const profile: Awaited<ReturnType<typeof getProfile>> = yield call(getProfile, action.payload);
    yield put(authActions.profileLoaded(mapProfile(profile)));
  } catch {
    yield put(authActions.profileLoaded(null));
  }
}

function* handleProfileUpdate(action: PayloadAction<{ name: string }>) {
  const token: string | null = yield select(selectToken);

  if (!token) {
    yield put(authActions.profileUpdateFailed('Для изменения профиля нужно войти.'));
    return;
  }

  try {
    const profile: Awaited<ReturnType<typeof updateProfile>> = yield call(updateProfile, token, action.payload.name);
    yield put(authActions.profileUpdated(mapProfile(profile)));
  } catch (error) {
    yield put(authActions.profileUpdateFailed(getErrorMessage(error)));
  }
}

export function* authSaga() {
  yield takeEvery(authActions.appStarted.type, handleAppStarted);
  yield takeEvery(authActions.loginRequested.type, handleLogin);
  yield takeEvery(authActions.logoutRequested.type, handleLogout);
  yield takeEvery(authActions.tokenChangedFromStorage.type, handleStorageTokenChange);
  yield takeEvery(authActions.profileUpdateRequested.type, handleProfileUpdate);
}

export { TOKEN_STORAGE_KEY };
