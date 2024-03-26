import {
  type NotificationQuestions,
  type NotificationWebinars
} from '~/entities/apiTypes';

export interface QuestionPayload {
  subject: string;
  questionText: string;
  questionType: string;
  email?: string;
}

import { baseApi } from '..';

export const notificationsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getNotificationWebinars: build.query<NotificationWebinars[], void>({
      query: () => ({
        url: 'Notifications/webinars'
      })
    }),
    getNotificationQuestions: build.query<NotificationQuestions[], void>({
      query: () => ({
        url: 'Notifications/questions'
      })
    }),
    sendQuestionsSupport: build.mutation<string, QuestionPayload>({
      query: (payload) => ({
        url: 'support',
        method: 'POST',
        body: payload
      })
    })
  })
});

export const {
  useGetNotificationWebinarsQuery,
  useGetNotificationQuestionsQuery,
  useSendQuestionsSupportMutation
} = notificationsApi;
