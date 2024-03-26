import { baseApi } from '..';
import {
  type BonusMaterials,
  type BonusMaterial
} from '../../../entities/apiTypes';

export const bonusApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getBonusMaterial: build.query<BonusMaterial, { id: string }>({
      query: ({ id }) => ({
        url: `BonusMaterial/${id}`
      }),
      providesTags: [{ type: 'BONUS', id: 'LIST' }]
    }),
    getBonusMaterials: build.query<BonusMaterials, void>({
      query: () => ({
        url: `BonusMaterial`
      }),
      providesTags: (result) =>
        result
          ? [
              ...Object.keys(result).map((id) => ({
                type: 'BONUSES' as const,
                id
              })),
              { type: 'BONUSES', id: 'LIST' }
            ]
          : [{ type: 'BONUS', id: 'ENTITY' }]
    }),

    startPlayBonusMaterial: build.mutation<string, { id: number }>({
      query: ({ id }) => ({
        url: `BonusMaterial/started/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'BONUSES', id: 'LIST' }]
    }),
    endPlayBonusMaterial: build.mutation<string, { id: number }>({
      query: ({ id }) => ({
        url: `BonusMaterial/seen/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'BONUSES', id: 'LIST' }]
    })
  })
});

export const {
  useGetBonusMaterialQuery,
  useStartPlayBonusMaterialMutation,
  useEndPlayBonusMaterialMutation,
  useGetBonusMaterialsQuery
} = bonusApi;
