import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, UserRole } from './types';

interface AuthState {
  token: string | null;
  initialized: boolean;
  profile: Profile | null;
}

const initialState: AuthState = {
  token: null,
  initialized: false,
  profile: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    appStarted: (state) => state,
    appInitialized(state) {
      state.initialized = true;
    },
    loginRequested: (state, _action: PayloadAction<UserRole>) => state,
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
    profileUpdated(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
