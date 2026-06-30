import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './types';

export interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  initialized: boolean;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  profileSaving: boolean;
  profileError: string | null;
}

const initialState: AuthState = {
  token: null,
  initialized: false,
  profile: null,
  loading: false,
  error: null,
  profileSaving: false,
  profileError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    appStarted: (state) => state,
    appInitialized(state) {
      state.initialized = true;
    },
    loginRequested(state, _action: PayloadAction<AuthCredentials>) {
      state.loading = true;
      state.error = null;
    },
    loginSucceeded(state, action: PayloadAction<{ token: string; profile: Profile }>) {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
      state.loading = false;
      state.error = null;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequested: (state) => state,
    tokenLoaded(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    tokenChangedFromStorage(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    profileLoaded(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
    },
    profileUpdateRequested(state, _action: PayloadAction<{ name: string }>) {
      state.profileSaving = true;
      state.profileError = null;
    },
    profileUpdated(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
      state.profileSaving = false;
      state.profileError = null;
    },
    profileUpdateFailed(state, action: PayloadAction<string>) {
      state.profileSaving = false;
      state.profileError = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
