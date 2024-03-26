import { HabitTracker } from '~/features/HabitTracker/HabitTracker';
import { Navbar } from '~/shared/ui/Navbar/Navbar';

import styles from './HabitTrackerPage.module.scss';

const routes = [{ id: 'home', title: 'Habit Tracker', path: '/habitTracker' }];

export const HabitTrackerPage = () => {
  return (
    <>
      <Navbar routes={routes} />
      <div className={styles.wrapper}>
        <div className={styles.innerTitle}>
          <p className={styles.page_title}></p>
        </div>
        <div className={styles.innerContent}>
          <div className={styles.habitTrackerContainer}>
            <h1>{routes[0].title}</h1>
            <HabitTracker />
          </div>
        </div>
      </div>
    </>
  );
};
