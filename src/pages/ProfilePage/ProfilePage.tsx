import { useState } from 'react';

import classNames from 'classnames';

import styles from './ProfilePage.module.scss';
import { ImageForm } from '../../features/Profile/ImageForm/ImageForm';
import { NotificationForm } from '../../features/Profile/NotificationForm/NotificationForm';
import { Subscribe } from '../../features/Profile/Subscribe/Subscribe';
import { UserInformationForm } from '../../features/Profile/UserInformationForm/UserInformationForm';
import { Button } from '../../shared/ui/Button/Button';
import { Navbar } from '../../shared/ui/Navbar/Navbar';

const TAB = {
  info: 'info',
  subscribes: 'subscribes'
} as const;

const routes = [{ id: 'home', title: 'Mein Profil', path: '/profile' }];

type TabState = (typeof TAB)[keyof typeof TAB];

export const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState<TabState>(TAB.info);

  const toggleTab = (tab: TabState) => {
    setSelectedTab(tab);
  };

  return (
    <div className={styles.container}>
      <Navbar routes={routes} />
      <h1>Mein Profil</h1>
      <div className={styles.tabs}>
        <Button
          className={classNames({
            [styles.active]: selectedTab === TAB.info ? 'active' : '',
            [styles.tab]: true
          })}
          appearance="secondary2"
          onClick={() => toggleTab(TAB.info)}
        >
          Deine Informationen
        </Button>
        <Button
          className={classNames({
            [styles.active]: selectedTab === TAB.subscribes ? 'active' : '',
            [styles.tab]: true
          })}
          appearance="secondary2"
          onClick={() => toggleTab(TAB.subscribes)}
        >
          Meine Abos
        </Button>
      </div>
      {selectedTab === TAB.info && (
        <div className={styles.info}>
          <div className={styles.leftSide}>
            <ImageForm />
            <NotificationForm />
          </div>
          <div className={styles.rightSide}>
            <UserInformationForm />
          </div>
        </div>
      )}
      {selectedTab === TAB.subscribes && <Subscribe />}
    </div>
  );
};
