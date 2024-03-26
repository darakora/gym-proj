import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { type AxiosError, type AxiosResponse } from 'axios';

import { type CreateTokenPayload } from './user.types';
import { BACKEND_BASE_URL } from '../../api/constant';
import { gymInstance } from '../../api/instance';
import { type JwtToken, type UserProfile } from '../../entities/apiTypes';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async function (_, thunkAPI) {
    const accessToken = localStorage.getItem('BG-access-token');

    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const { data } = await gymInstance.get<UserProfile>(`User`, {
      signal: thunkAPI.signal
    });
    return data;
  }
);

export const createTokens = createAsyncThunk(
  'user/createTokens',
  async function (payload: CreateTokenPayload, { rejectWithValue }) {
    try {
      const { data } = await axios.post<
        JwtToken,
        AxiosResponse<JwtToken>,
        CreateTokenPayload
      >(`${BACKEND_BASE_URL}auth`, payload);

      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
