import { useState } from 'react';

import { ReactComponent as CheckMark } from '~/assets/icons/popup/checkmark.svg';
import { ReactComponent as ClosePopUpIcon } from '~/assets/icons/popup/close.svg';
import { useCancelSubscriptionMutation } from '~/store/api/user/user.api';

import styles from './SubscriptionPopUp.module.scss';
import { Button } from '../../../shared/ui/Button/Button';

interface SubscriptionError {
  message: string;
}

export const SubscriptionPopUp = ({
  onClick,
  expirationDate
}: {
  onClick: () => void;
  expirationDate: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<SubscriptionError | null>(
    null
  );

  const closePopUp = () => {
    setIsOpen(false);
    onClick();
  };

  const [cancelSubscription, { isLoading: isCanceling }] =
    useCancelSubscriptionMutation();

  const handleCancelSubscription = () => {
    cancelSubscription()
      .unwrap()
      .then(() => {
        setErrorMessage(null);
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
          closePopUp();
        }, 1500);
      })
      .catch((error: SubscriptionError) => setErrorMessage(error));
  };
  return (
    <div
      className={isOpen ? styles.popup_overflow : styles.popup_overflow_hidden}
    >
      <div className={styles.container}>
        {errorMessage && <p className={styles.error}>{errorMessage.message}</p>}
        {isSent ? (
          <div className={styles.markContainer}>
            <h2>Ihr Abonnement wurde gekündigt</h2>
            <div className={styles.checkMark}>
              <CheckMark />
            </div>
          </div>
        ) : (
          <>
            <Button
              className={styles.close_button}
              appearance="secondary2"
              icon={<ClosePopUpIcon />}
              onClick={closePopUp}
            />
            <h1>Gym Club</h1>
            <p>
              Ihr Abonnement läuft am <span>{expirationDate}</span> Sind Sie
              sicher, dass Sie den Vertrag bis zu diesem Datum kündigen möchten?
            </p>
            <div className={styles.buttons_container}>
              <Button
                appearance="secondary"
                className={styles.ok_button}
                shouldFitContainer
                onClick={handleCancelSubscription}
                disabled={isCanceling}
              >
                OK
              </Button>
              <Button
                appearance="secondary2"
                className={styles.cancel_button}
                shouldFitContainer
                onClick={closePopUp}
                disabled={isCanceling}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
