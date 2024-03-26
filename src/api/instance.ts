import axiosCore, { type AxiosError, type AxiosResponse } from 'axios';

import { BACKEND_BASE_URL } from './constant';
import { useAppDispatch } from '../store/store.types';
import { userActions } from '../store/user/user.slice';

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenPayload {
  token: string;
}

const getRefreshedToken = async (
  token: string
): Promise<RefreshTokenResponse> => {
  if (token) {
    const { data } = await axiosCore.post<
      RefreshTokenResponse,
      AxiosResponse<RefreshTokenResponse>,
      RefreshTokenPayload
    >(`${BACKEND_BASE_URL}/auth/refresh`, {
      token: token
    });
    return data;
  } else {
    throw new Error('Unauthorized');
  }
};

export const gymInstance = axiosCore.create({
  baseURL: `${BACKEND_BASE_URL}`
});

gymInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('BG-access-token');
  if (!accessToken) {
    throw new Error('Unauthorized');
  }
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});

gymInstance.interceptors.response.use(undefined, (error: AxiosError) => {
  const errorStatus = error.response?.status;
  const refreshToken = localStorage.getItem('BG-refresh-token');
  let requestRefreshCount = 0;
  if (errorStatus === 401 && requestRefreshCount < 3 && refreshToken) {
    requestRefreshCount += 1;
    getRefreshedToken(refreshToken)
      .then((data) => {
        localStorage.setItem('BG-access-token', data.accessToken);
        localStorage.setItem('BG-refresh-token', data.refreshToken);
      })
      .catch((error: AxiosError) => {
        throw new Error(error.message);
      });
  } else if (errorStatus === 401 && requestRefreshCount === 3) {
    const dispatch = useAppDispatch();
    dispatch(userActions.logout());
  }
  return Promise.reject(error);
});
