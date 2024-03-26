import { type Webinar } from '~/entities/apiTypes';

import { type PayLoad, type RequestData, type RequestID } from './webinar.type';
import { baseApi } from '..';

export const webinarApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getWebinars: build.query<Webinar[], RequestData>({
      query: (requestData) => ({
        url: `Webinars/${requestData.startYear}/${requestData.startMonth}/${requestData.startDay}`
      })
    }),
    getWebinar: build.query<Webinar, number>({
      providesTags: (result) =>
        result
          ? [{ type: 'WEBINARS', id: 'LIST' }]
          : [{ type: 'WEBINARS', id: 'ENTITY' }],
      query: (id) => ({
        url: `Webinars/${id}`
      })
    }),
    updateLikes: build.mutation<string, RequestID>({
      query: ({ id }) => ({
        url: `Webinars/like/${id}`,
        method: 'POST'
      })
    }),
    undoReaction: build.mutation<string, RequestID>({
      query: ({ id }) => ({
        url: `Webinars/undo-reaction/${id}`,
        method: 'POST'
      })
    }),
    getWebinarSeen: build.mutation<string, RequestID>({
      query: ({ id }) => ({
        url: `Webinars/seen/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'WEBINARS', id: 'LIST' }]
    }),
    startWatchWebinar: build.mutation<string, RequestID>({
      query: ({ id }) => ({
        url: `Webinars/started/${id}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'WEBINARS', id: 'LIST' }]
    }),
    addQuestion: build.mutation<string, PayLoad>({
      query: ({ payload }) => ({
        url: `Webinars/question`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'WEBINARS', id: 'LIST' }]
    })
  })
});

export const {
  useGetWebinarsQuery,
  useUpdateLikesMutation,
  useGetWebinarSeenMutation,
  useAddQuestionMutation,
  useGetWebinarQuery,
  useUndoReactionMutation,
  useStartWatchWebinarMutation
} = webinarApi;
