import { baseApi } from '..';
import { type Topic } from '../../../entities/apiTypes';

export const topicsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getTopicsName: build.query<[Topic], void>({
      query: () => ({
        url: 'PagesText'
      })
    }),
    getTopicText: build.query<Topic, string>({
      query: (name) => ({
        url: `PagesText/${name}`
      })
    })
  })
});

export const { useGetTopicsNameQuery, useGetTopicTextQuery } = topicsApi;
