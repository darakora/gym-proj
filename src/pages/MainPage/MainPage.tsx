import Vimeo from '@u-wave/react-vimeo';

import styles from './MainPage.module.scss';
import { Button } from '../../shared/ui/Button/Button';
import { Loader } from '../../shared/ui/Loader/Loader';
import { Navbar } from '../../shared/ui/Navbar/Navbar';
import { PageText } from '../../shared/ui/PageText/PageText';
import { useGetTopicTextQuery } from '../../store/api/topics/topics';

export const MainPage = () => {
  const {
    data: mainText,
    isLoading: isTextLoading,
    refetch
  } = useGetTopicTextQuery('main');

  return isTextLoading ? (
    <div className={styles.container}>
      <Navbar />
      <Loader />
    </div>
  ) : mainText?.page ? (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content_container}>
        <div className={styles.content}>
          <div className={styles.video}>
            {mainText.videoUrl && (
              <Vimeo
                video={mainText.videoUrl}
                className={styles.player}
                color="ce3591"
              />
            )}
          </div>
          <PageText text={mainText.page.text} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <p className={styles.error_text}>
        Hoppla, die Seite wurde nicht gefunden.
      </p>
      <Button
        appearance="secondary"
        className={styles.refetch_button}
        onClick={() => refetch()}
      >
        Erneut abrufen
      </Button>
    </div>
  );
};
