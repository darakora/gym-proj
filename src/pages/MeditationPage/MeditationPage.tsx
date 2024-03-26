import { Loader } from '~/shared/ui/Loader/Loader';
import { PageText } from '~/shared/ui/PageText/PageText';
import { useGetMeditationsQuery } from '~/store/api/meditations/meditations.api';

import styles from './MeditationPage.module.scss';
import { AudioPlayer } from '../../features/Bonus/AudioPlayer/AudioPlayer';
import { Navbar } from '../../shared/ui/Navbar/Navbar';

export const MeditationPage = () => {
  const { data, isLoading } = useGetMeditationsQuery();

  const routes = () => {
    if (data) {
      return [
        { id: 'meditations', title: 'meditations', path: '/meditations' }
      ];
    }
  };

  if (isLoading) {
    return (
      <div className={styles.animationContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {data && (
        <div className={styles.container}>
          <Navbar routes={routes()} />
          <div className={styles.content}>
            <div className={styles.title}>
              {data && data.html.length > 0 ? (
                <PageText text={data.html} />
              ) : null}
            </div>
            {data &&
              data.meditations.map((meditation) => (
                <AudioPlayer
                  meditation={meditation}
                  key={meditation.id}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
