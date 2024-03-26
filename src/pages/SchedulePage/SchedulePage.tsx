import { ScheduleCalendar } from '~/features/ScheduleCalendar/ScheduleCalendar';
import { Navbar } from '~/shared/ui/Navbar/Navbar';

import styles from './SchedulePage.module.scss';

const routes = [{ id: 'home', title: 'Mein Wochenplan', path: '/schedule' }];

export const SchedulePage = () => {
  return (
    <>
      <Navbar routes={routes} />
      <div className={styles.wrapper}>
        <div className={styles.habitTrackerContainer}>
          <ScheduleCalendar />
        </div>
      </div>
    </>
  );
};
