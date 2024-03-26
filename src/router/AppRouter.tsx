import { useEffect } from 'react';

import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';

import { LayoutSideBarOff } from '~/layouts/LayoutSideBarOff/LayoutSideBarOff';
import { HabitTrackerPage } from '~/pages/HabitTrackerPage/HabitTrackerPage';
import { NotificationPage } from '~/pages/NotificationPage/NotificationPage';
import { SchedulePage } from '~/pages/SchedulePage/SchedulePage';
import { WebinarBroadCastPage } from '~/pages/WebinarBroadCastPage/WebinarBroadCastPage';
import { useGetBonusMaterialsQuery } from '~/store/api/bonus/bonus.api';
import { setBonusMaterials } from '~/store/bonusMaterials/bonusMaterials';

import { LoginForm } from '../features/LoginForm/LoginForm';
import { ResetPassword } from '../features/ResetPassword/ResetPassword';
import { ResetPasswordResult } from '../features/ResetPasswordResult/ResetPasswordResult';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { BodyPracticePage } from '../pages/BonusMaterial/BodyPracticePage/BodyPracticePage';
import { EyeExercisePage } from '../pages/BonusMaterial/EyeExercisePage/EyeExercisePage';
import { FaceTechiquePage } from '../pages/BonusMaterial/FaceTechiquePage/FaceTechiquePage';
import { GuashaMassagePage } from '../pages/BonusMaterial/GuashaMassagePage/GuashaMassagePage.Page';
import { GuestsRecordingsPage } from '../pages/BonusMaterial/GuestsRecordingsPage/GuestsRecordingsPage';
import { NeckExercisePage } from '../pages/BonusMaterial/NeckExercisePage/NeckExercisePage';
import { RoutinePage } from '../pages/BonusMaterial/RoutinePage/RoutinePage';
import { TapticTechniquePage } from '../pages/BonusMaterial/TapticTechniquePage/TapticTechniquePage';
import { WebinarsPage } from '../pages/BonusMaterial/WebinarsPage/WebinarsPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { MeditationPage } from '../pages/MeditationPage/MeditationPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { TopicPage } from '../pages/TopicPage/TopicPage';
import { СontraindicationsPage } from '../pages/СontraindicationsPage/СontraindicationsPage';
import { Loader } from '../shared/ui/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../store/store.types';
import { fetchUser } from '../store/user/user.api';
import { selectTokens, selectUser } from '../store/user/user.selector';

const ProtectedRoute = () => {
  const user = useAppSelector(selectUser);

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

const PublicOnlyRoute = () => {
  const user = useAppSelector(selectUser);

  return user ? (
    <Navigate
      to="/"
      replace
    />
  ) : (
    <Outlet />
  );
};

const ConfirmedRoute = () => {
  const user = useAppSelector(selectUser);

  return user?.isConfirmed ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
};

const routerSchema = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            path: '/',
            element: <MainPage />
          },
          {
            path: 'contraindications',
            element: <СontraindicationsPage />
          }
        ]
      },
      {
        element: <ConfirmedRoute />,
        children: [
          {
            index: true,
            path: '/',
            element: <MainPage />
          },
          {
            path: 'contraindications',
            element: <СontraindicationsPage />
          },
          {
            path: ':topic',
            element: <TopicPage />
          },
          {
            path: 'habitTracker',
            element: <HabitTrackerPage />
          },
          {
            path: 'schedule',
            element: <SchedulePage />
          },
          {
            path: 'webinars/:id',
            element: <WebinarsPage />
          },
          {
            path: 'routines/:id',
            element: <RoutinePage />
          },
          {
            path: 'bodyPractices/:id',
            element: <BodyPracticePage />
          },
          {
            path: 'taping/:id',
            element: <TapticTechniquePage />
          },
          {
            path: 'facial/:id',
            element: <FaceTechiquePage />
          },
          {
            path: 'augengym/:id',
            element: <EyeExercisePage />
          },
          {
            path: 'neckExercises/:id',
            element: <NeckExercisePage />
          },
          {
            path: 'meditations',
            element: <MeditationPage />
          },
          {
            path: 'guest-record/:id',
            element: <GuestsRecordingsPage />
          },
          {
            path: 'guasha-massage/:id',
            element: <GuashaMassagePage />
          }
        ]
      }
    ]
  },
  {
    Component: LayoutSideBarOff,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            index: true,
            path: 'login',
            element: <LoginForm />
          },
          {
            path: 'reset',
            element: <ResetPassword />
          },
          {
            path: 'reset-success',
            element: <ResetPasswordResult />
          }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            path: 'notifications',
            element: <NotificationPage />
          },
          {
            path: 'webinar/:id',
            element: <WebinarBroadCastPage />
          }
        ]
      }
    ]
  }
]);

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const { data: newBonus } = useGetBonusMaterialsQuery();

  useEffect(() => {
    if (newBonus) {
      dispatch(setBonusMaterials(newBonus));
    }
  }, [dispatch, newBonus]);

  const isInitializing = useAppSelector(
    ({ user }) =>
      (user.currentUser.status === 'loading' ||
        user.currentUser.status === 'idle') &&
      user.tokens.status === 'success'
  );

  useEffect(() => {
    if (tokens) {
      const promise = dispatch(fetchUser());

      return () => {
        promise.abort('cancelled');
      };
    }
  }, [dispatch, tokens]);

  return isInitializing ? <Loader /> : <RouterProvider router={routerSchema} />;
};
