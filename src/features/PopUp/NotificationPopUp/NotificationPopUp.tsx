import { useState } from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as ClosePopUpIcon } from '~/assets/icons/popup/close.svg';
import { ReactComponent as LinkIcon } from '~/assets/icons/popup/link.svg';
import { type Webinar } from '~/entities/apiTypes';
import { useStartWatchWebinarMutation } from '~/store/api/webinars/webinars.api';

import styles from './NotificationPopUp.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { getFormattedGermanDate } from '../../../shared/utils/getFormattedDate';

export const NotificationPopUp = ({
  onClick,
  webinar
}: {
  onClick: () => void;
  webinar: Webinar | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [startWatch] = useStartWatchWebinarMutation();

  const closePopUp = () => {
    setIsOpen(false);
    onClick();
  };

  const startWatchOnline = () => {
    if (webinar) {
      void startWatch({ id: webinar.id });
    }
  };

  return (
    <div
      className={isOpen ? styles.popup_overflow : styles.popup_overflow_hidden}
    >
      <div className={styles.container}>
        <Button
          className={styles.close_button}
          appearance="secondary2"
          icon={<ClosePopUpIcon />}
          onClick={closePopUp}
        />
        <h1>{webinar && webinar.title}</h1>
        <div className={styles.info}>
          <div className={styles.info_text}>
            <p>Meeting-Status:</p>
            <span>
              Noch nicht gestartet
              <span>(Neu laden, um Statusänderungen anzuzeigen.)</span>
            </span>
          </div>
          <div className={styles.info_text}>
            <p>Beginn:</p>
            <span>{webinar && getFormattedGermanDate(webinar.dateIso)}</span>
          </div>
          <div className={styles.info_text}>
            <p>Dauer:</p>
            <span>{webinar && webinar.lengthMin} Minuten</span>
          </div>
          <div className={styles.links}>
            {webinar && (
              <Link
                className={styles.video_link}
                to={`${webinar.webinarUrl}`}
                target="_blank"
                onClick={startWatchOnline}
              >
                <LinkIcon />
                Über Zoom teilnehmen
              </Link>
            )}
          </div>
        </div>
        <div className={styles.settings_info}>
          <p>
            Die Unterrichtsbenachrichtigung kann als SMS oder E-Mail gesendet
            werden. Um die Benachrichtigungsmethode zu ändern, gehen Sie zu den
            <Link
              className={styles.settings_link}
              to={'/profile'}
            >
              Einstellungen
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
