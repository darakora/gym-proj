import { FETCH_STATUS } from '../../entities/fetchStatus';
import { type RootState } from '../store.types';

export const selectUser = (state: RootState) =>
  state.user.currentUser.status === FETCH_STATUS.SUCCESS
    ? state.user.currentUser.data
    : null;

export const selectTokens = (state: RootState) => {
  switch (state.user.tokens.status) {
    case FETCH_STATUS.SUCCESS: {
      return state.user.tokens.data;
    }
    case FETCH_STATUS.LOADING: {
      return state.user.tokens.status;
    }
    case FETCH_STATUS.ERROR: {
      return state.user.tokens.error;
    }
    case FETCH_STATUS.IDLE: {
      return state.user.tokens.status;
    }
    default: {
      return null;
    }
  }
};
