import { useState } from 'react';

import classNames from 'classnames';

import { NotificationsQuestions } from '~/features/NotificationsEvents/NotificationsQuestions/NotificationsQuestions';
import { NotificationsWebinars } from '~/features/NotificationsEvents/NotificationsWebinars/NotificationsWebinars';
import { Button } from '~/shared/ui/Button/Button';
import { Loader } from '~/shared/ui/Loader/Loader';
import { Navbar } from '~/shared/ui/Navbar/Navbar';
import {
  useGetNotificationQuestionsQuery,
  useGetNotificationWebinarsQuery
} from '~/store/api/notifications/notifications';

import styles from './NotificationPage.module.scss';

const TAB = {
  planned: 'Geplante Übungseinheiten',
  questionAndAnswersWebinars: 'Antworten auf Kommentare'
} as const;

const routes = [
  { id: 'home', title: 'Benachrichtigung', path: '/notifications' }
];

type TabState = (typeof TAB)[keyof typeof TAB];

export const NotificationPage = () => {
  const [selectedTab, setSelectedTab] = useState<TabState>(TAB.planned);

  const toggleTab = (tab: TabState) => {
    setSelectedTab(tab);
  };

  const { data: webinars, isLoading } = useGetNotificationWebinarsQuery();
  const { data: questions } = useGetNotificationQuestionsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Navbar routes={routes} />
          <h1>{routes[0].title}</h1>
          <div className={styles.tabs}>
            {Object.entries(TAB).map((tab) => (
              <Button
                className={classNames({
                  [styles.active]: selectedTab === tab[1] ? 'active' : '',
                  [styles.tab]: true
                })}
                appearance="secondary2"
                onClick={() => toggleTab(tab[1])}
                key={tab[1]}
              >
                {tab[1]}
              </Button>
            ))}
          </div>

          <div className={styles.planned}>
            {webinars && selectedTab === TAB.planned && (
              <NotificationsWebinars webinars={webinars} />
            )}
            {questions && selectedTab === TAB.questionAndAnswersWebinars && (
              <NotificationsQuestions questions={questions} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
