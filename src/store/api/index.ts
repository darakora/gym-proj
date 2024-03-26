import { type QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import { BACKEND_BASE_URL } from '../../api/constant';
import { userActions } from '../user/user.slice';

interface UpdateAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('BG-access-token');
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (argument, api, extraOptions) => {
  let result = await baseQuery(argument, api, extraOptions);
  const refreshToken = localStorage.getItem('BG-refresh-token');
  if (result.error && result.error.status === 401 && refreshToken) {
    const updateAccessTokenResult = (await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        body: { token: refreshToken }
      },
      api,
      extraOptions
    )) as QueryReturnValue<UpdateAccessTokenResponse>;
    if (updateAccessTokenResult.data) {
      localStorage.setItem(
        'BG-access-token',
        updateAccessTokenResult.data.accessToken
      );
      localStorage.setItem(
        'BG-refresh-token',
        updateAccessTokenResult.data.refreshToken
      );
      result = await baseQuery(argument, api, extraOptions);
    } else {
      api.dispatch(userActions.logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'WEBINARS',
    'HABITS',
    'BONUSES',
    'BONUS',
    'MEDITATION',
    'MEDITATIONS',
    'SUBSCRIPTION'
  ],
  endpoints: () => ({})
});
