import { baseApi } from '..';
import { type Meditation } from '../../../entities/apiTypes';

export interface MeditationsResponse {
  meditations: Meditation[];
  html: string;
}

export const guestsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getMeditation: build.query<Meditation, { id: string }>({
      query: ({ id }) => ({
        url: `Meditations/${id}`
      }),
      providesTags: [{ type: 'MEDITATION', id: 'LIST' }]
    }),
    getMeditations: build.query<MeditationsResponse, void>({
      query: () => ({
        url: `Meditations`
      }),
      providesTags: (result) =>
        result
          ? [
              ...Object.keys(result).map((id) => ({
                type: 'MEDITATIONS' as const,
                id
              })),
              { type: 'MEDITATIONS', id: 'LIST' }
            ]
          : [{ type: 'MEDITATION', id: 'ENTITY' }]
    }),
    startPlayMeditation: build.mutation<string, { id: number }>({
      query: ({ id }) => ({
        url: `Meditations/started/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'MEDITATIONS', id: 'LIST' }]
    }),
    endPlayMeditation: build.mutation<string, { id: number }>({
      query: ({ id }) => ({
        url: `Meditations/seen/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'MEDITATIONS', id: 'LIST' }]
    })
  })
});

export const {
  useGetMeditationQuery,
  useStartPlayMeditationMutation,
  useEndPlayMeditationMutation,
  useGetMeditationsQuery
} = guestsApi;
