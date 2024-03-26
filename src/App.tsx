import { Provider } from 'react-redux';

import './App.styles.css';
import { Animation } from './features/Animation/Animation';
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <Animation />
    </Provider>
  );
};
