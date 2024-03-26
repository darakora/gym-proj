import { baseApi } from '..';

interface UpdateUserInfoPayload {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}

interface SubscriptionData {
  texts: string[];
  orderUrl: string;
  expirationDate: string;
  isCancellationAllowed: boolean;
}

interface UpdateUserNotificationsSettings {
  /* eslint-disable @typescript-eslint/naming-convention -- Api requires */
  emailNotification: boolean;
  smsNotification: boolean;
  /* eslint-enable */
}

interface UpdateConfirmationState {
  isConfirmed: boolean | string;
}

export const userApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    updateUserInfo: build.mutation<
      { response: string },
      { payload: UpdateUserInfoPayload }
    >({
      query: ({ payload }) => ({
        url: 'User/info',
        method: 'POST',
        body: payload
      })
    }),
    updateUserNotificationsSettings: build.mutation<
      { response: string },
      { payload: UpdateUserNotificationsSettings }
    >({
      query: ({ payload }) => ({
        url: 'User/notifications',
        method: 'POST',
        body: payload
      })
    }),
    updateConfirmationState: build.mutation<
      { response: string },
      { payload: UpdateConfirmationState }
    >({
      query: ({ payload }) => ({
        url: `User/confirm?status=${payload.isConfirmed as string}`,
        method: 'POST'
      })
    }),
    getUserSubscriptionData: build.query<SubscriptionData, void>({
      query: () => ({
        url: `User/subscription-with-link`
      }),
      providesTags: [{ type: 'SUBSCRIPTION', id: 'LIST' }]
    }),
    cancelSubscription: build.mutation<{ response: string }, void>({
      query: () => ({
        url: `User/subscription/cancel`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'SUBSCRIPTION', id: 'LIST' }]
    })
  })
});

export const {
  useUpdateUserInfoMutation,
  useUpdateUserNotificationsSettingsMutation,
  useUpdateConfirmationStateMutation,
  useGetUserSubscriptionDataQuery,
  useCancelSubscriptionMutation
} = userApi;
