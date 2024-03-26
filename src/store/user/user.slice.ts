import { createSlice } from '@reduxjs/toolkit';

import { createTokens, fetchUser } from './user.api';
import { type TokenError, type UserSlice } from './user.types';
import { FETCH_STATUS } from '../../entities/fetchStatus';
import { startAppListening } from '../store.types';

const getInitialState = (): UserSlice => {
  const accessToken = localStorage.getItem('BG-access-token');
  const refreshToken = localStorage.getItem('BG-refresh-token');

  return {
    currentUser: { status: FETCH_STATUS.IDLE },
    tokens:
      accessToken && refreshToken
        ? { status: FETCH_STATUS.SUCCESS, data: { accessToken, refreshToken } }
        : { status: FETCH_STATUS.IDLE }
  };
};

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState,
  reducers: {
    logout: (state) => {
      state.currentUser = { status: FETCH_STATUS.IDLE };
      state.tokens = { status: FETCH_STATUS.IDLE };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.currentUser = { status: FETCH_STATUS.LOADING };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = {
        status: FETCH_STATUS.SUCCESS,
        data: action.payload
      };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        return;
      }

      state.currentUser = {
        status: FETCH_STATUS.ERROR,
        error: action.error.message || 'Unexpected error'
      };
    });
    builder.addCase(createTokens.pending, (state) => {
      state.tokens = { status: FETCH_STATUS.LOADING };
    });
    builder.addCase(createTokens.fulfilled, (state, action) => {
      state.tokens = { status: FETCH_STATUS.SUCCESS, data: action.payload };
    });
    builder.addCase(createTokens.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        return;
      }

      state.tokens = {
        status: FETCH_STATUS.ERROR,
        error: (action.payload as TokenError) || 'Unexpected error'
      };
    });
  }
});

startAppListening({
  matcher: createTokens.fulfilled.match,
  effect: ({ payload }) => {
    localStorage.setItem('BG-access-token', payload.accessToken);
    localStorage.setItem('BG-refresh-token', payload.refreshToken);
  }
});

startAppListening({
  matcher: userSlice.actions.logout.match,
  effect: () => {
    localStorage.removeItem('BG-access-token');
    localStorage.removeItem('BG-refresh-token');
  }
});

export const { actions: userActions } = userSlice;
