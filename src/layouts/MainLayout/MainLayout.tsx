import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '~/features/Header/Header';
import { Sidebar } from '~/features/Sidebar/Sidebar';
import { StickyButtons } from '~/features/StickyButton/StickyButton';

import styles from './MainLayout.module.scss';
import { Footer } from '../../features/Footer/Footer';
import { ServicePopUp } from '../../features/PopUp/ServicePopUp/ServicePopUp';

export const MainLayout = () => {
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
        <div className={styles.inner}>
          <Sidebar />
          <Outlet />
        </div>
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
