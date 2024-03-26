import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '~/features/Header/Header';
import { StickyButtons } from '~/features/StickyButton/StickyButton';

import styles from './LayoutSideBarOff.module.scss';
import { Footer } from '../../features/Footer/Footer';
import { ServicePopUp } from '../../features/PopUp/ServicePopUp/ServicePopUp';

export const LayoutSideBarOff = () => {
  const [isQuestionsPopUpCalled, setIsQuestionsPopUpCalled] = useState(false);
  const [isSupportPopUpCalled, setIsSupportPopUpCalled] = useState(false);

  const toggleQuestionsPopUp = () => {
    setIsQuestionsPopUpCalled((hasBeenClicked) => !hasBeenClicked);
  };
  const toggleSupportPopUp = () => {
    setIsSupportPopUpCalled((hasBeenClicked) => !hasBeenClicked);
  };
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Outlet />
        <StickyButtons
          clickMail={toggleQuestionsPopUp}
          clickHeadphones={toggleSupportPopUp}
        />
      </main>
      <Footer />
      {isQuestionsPopUpCalled && (
        <div className={styles.popUp}>
          <ServicePopUp
            onClick={toggleQuestionsPopUp}
            appearance="questions"
          />
        </div>
      )}
      {isSupportPopUpCalled && (
        <div className={styles.popUp}>
          <ServicePopUp
            onClick={toggleSupportPopUp}
            appearance="support"
          />
        </div>
      )}
    </div>
  );
};
