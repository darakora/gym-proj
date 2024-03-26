import { useNavigate } from 'react-router-dom';

import { ReactComponent as Notifications } from '~/assets/icons/notificationWebinars.svg';
import { type NotificationWebinars } from '~/entities/apiTypes';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';

import styles from './NotificationsWebinars.module.scss';

export const NotificationsWebinars = ({
  webinars
}: {
  webinars: NotificationWebinars[];
}) => {
  const navigation = useNavigate();

  return (
    <div>
      {webinars && (
        <div className={styles.container}>
          {webinars.map((event) => (
            <div
              className={styles.plannedContainer}
              key={event.webinarId}
            >
              <div className={styles.plannedInner}>
                <div className={styles.notificationsContainer}>
                  <Notifications />
                  <div className={styles.dateMobile}>{event.date}</div>
                </div>
                <div className={styles.plannedContent}>
                  <div>{event.webinarTitle}</div>
                  <div>{event.description}</div>
                  <div>
                    <div className={styles.dateDesktop}>{event.date}</div>
                    <Button
                      appearance={ButtonAppearance.Secondary}
                      className={styles.btnEvent}
                      onClick={() => navigation(`/webinar/${event.webinarId}`)}
                    >
                      Zum Ereignis gehen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
