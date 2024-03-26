import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './api';
import { bonusMaterialsSlice } from './bonusMaterials/bonusMaterials';
import { sideBarClickSlice } from './sideBarClick/sideBarClickSlice';
import { listenerMiddleware } from './store.listeners';
import { userSlice } from './user/user.slice';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [bonusMaterialsSlice.name]: bonusMaterialsSlice.reducer,
    [sideBarClickSlice.name]: sideBarClickSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      listenerMiddleware.middleware,
      baseApi.middleware
    ),
  devTools: import.meta.env.DEV
});
