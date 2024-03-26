import { useState } from 'react';

import { ReactComponent as SubscriptionImage } from '~/assets/subscriptionImage.svg';
import { Loader } from '~/shared/ui/Loader/Loader';
import { getFormattedGermanDate } from '~/shared/utils/getFormattedDate';
import { useGetUserSubscriptionDataQuery } from '~/store/api/user/user.api';

import styles from './Subscribe.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { SubscriptionPopUp } from '../../PopUp/SubscriptionPopUp/SubscriptionPopUp';

export const Subscribe = () => {
  const [isPopUpCalled, setIsPopUpCalled] = useState(false);

  const togglePopUp = () => {
    setIsPopUpCalled((hasBeenClicked) => !hasBeenClicked);
  };

  const { data: subscriptionData, isLoading } =
    useGetUserSubscriptionDataQuery();

  return (
    <div className={styles.container}>
      {isPopUpCalled && (
        <SubscriptionPopUp
          onClick={togglePopUp}
          expirationDate={getFormattedGermanDate(
            subscriptionData?.expirationDate || ''
          )}
        />
      )}
      <div className={styles.card}>
        <p className={styles.title}>Gym Club</p>

        <div className={styles.info}>
          <SubscriptionImage className={styles.image} />
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.text_info}>
              {subscriptionData &&
                subscriptionData.texts.map((discription) => (
                  <p
                    className={styles.text}
                    key={discription}
                  >
                    &#9679; {discription}
                  </p>
                ))}
              <Button
                appearance="secondary2"
                className={styles.subscribe_btn}
              >
                <a
                  href={subscriptionData && subscriptionData.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  zu deinem Abo
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
      {subscriptionData && subscriptionData.isCancellationAllowed && (
        <div className={styles.cancel_container}>
          <Button
            appearance="secondary"
            className={styles.cancel_btn}
            onClick={togglePopUp}
          >
            Mein Abo kündigen
          </Button>
          <p>
            Da die Funktion zur Kündigung des Abonnements mit einem Klick sich
            noch in der Testphase befindet, bitten wir Sie, Ihre
            Kündigungsanfragen an{' '}
            <a href="mailto:support@club.gym.org">
              support@club.gym.org
            </a>{' '}
            zu senden.
          </p>
        </div>
      )}
    </div>
  );
};
