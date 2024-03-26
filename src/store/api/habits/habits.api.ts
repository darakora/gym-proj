import { BACKEND_BASE_URL } from '~/api/constant';
import { type Habit } from '~/store/api/habits/habit.type';

import { baseApi } from '..';

interface Payload {
  payload: Habit[];
}

export const habitApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    updateHabits: build.mutation<string, Payload>({
      invalidatesTags: ['HABITS'],
      query: ({ payload }) => ({
        url: `${BACKEND_BASE_URL}Habit/bulk`,
        method: 'POST',
        body: payload
      })
    }),
    getHabits: build.query<Habit[], void>({
      providesTags: ['HABITS'],
      query: () => ({
        url: `${BACKEND_BASE_URL}Habit`
      })
    })
  })
});

export const { useUpdateHabitsMutation, useGetHabitsQuery } = habitApi;
