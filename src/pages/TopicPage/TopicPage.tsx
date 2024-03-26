import { useNavigate, useParams } from 'react-router-dom';

import styles from './TopicPage.module.scss';
import { Button } from '../../shared/ui/Button/Button';
import { Loader } from '../../shared/ui/Loader/Loader';
import { Navbar } from '../../shared/ui/Navbar/Navbar';
import { PageText } from '../../shared/ui/PageText/PageText';
import { useGetTopicTextQuery } from '../../store/api/topics/topics';

export const TopicPage = () => {
  const { topic } = useParams<'topic'>();
  const navigate = useNavigate();

  const routes = () => {
    if (topic)
      return [
        {
          id: 'topic',
          title: `${topic}`,
          path: `/${topic}`
        }
      ];
  };

  const {
    data: topicText,
    isLoading: isTopicTextLoading,
    isError: isTopicTextError
  } = useGetTopicTextQuery(topic || '');

  return isTopicTextLoading ? (
    <>
      <Navbar routes={routes()} />
      <div className={styles.container}>
        <Loader />
      </div>
    </>
  ) : isTopicTextError ? (
    <div className={styles.container}>
      <p className={styles.error_text}>
        Hoppla, die Seite wurde nicht gefunden.
      </p>
      <Button
        appearance="secondary"
        className={styles.main_page_button}
        onClick={() => navigate('/')}
      >
        Zur Startseite
      </Button>
    </div>
  ) : (
    topicText && (
      <div className={styles.container}>
        <Navbar routes={routes()} />
        <h1>{topicText.displayName}</h1>
        <PageText text={topicText.text} />
      </div>
    )
  );
};
