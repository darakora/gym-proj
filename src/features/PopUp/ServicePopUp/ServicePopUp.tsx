import { useState } from 'react';

import { ReactComponent as ClosePopUpIcon } from '~/assets/icons/popup/close.svg';

import styles from './ServicePopUp.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { PopUpForm } from '../PopUpForm/PopUpForm';

export const POP_UP_APPEARANCE = {
  questions: 'questions',
  support: 'support'
} as const;

type PopUpAppearance =
  (typeof POP_UP_APPEARANCE)[keyof typeof POP_UP_APPEARANCE];

export const ServicePopUp = ({
  onClick,
  appearance
}: {
  onClick: () => void;
  appearance: PopUpAppearance;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopUp = () => {
    setIsOpen(false);
    onClick();
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
        {appearance === POP_UP_APPEARANCE.questions && (
          <div className={styles.text_container}>
            <h1>Frage stellen</h1>
            <p>
              Hier kanst du gerne deine Fragen und Wünsche hinterlassen.
              Solltest du jedoch technische Störungen haben, so melde dich bitte
              bei unserem Technischen Support Team.
            </p>
          </div>
        )}
        {appearance === POP_UP_APPEARANCE.support && (
          <div className={styles.text_container}>
            <h1>Technischer Support</h1>
            <p>
              Hier kannst du deine Anfrage bei technischen Störungen stellen
              (Passwort, fehlende Inhalte, ect.).
            </p>
          </div>
        )}
        <PopUpForm
          typeQuestion={appearance}
          closePopUp={closePopUp}
        />
      </div>
    </div>
  );
};
