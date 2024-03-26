import { useState } from 'react';

import Vimeo from '@u-wave/react-vimeo';

import { ReactComponent as PlayIcon } from '~/assets/icons/play.svg';

import styles from './VideoPlayer.module.scss';
import {
  useEndPlayBonusMaterialMutation,
  useStartPlayBonusMaterialMutation
} from '../../../store/api/bonus/bonus.api';
import {
  useEndPlayMeditationMutation,
  useStartPlayMeditationMutation
} from '../../../store/api/meditations/meditations.api';

export const VideoPlayer = ({
  videoLink,
  id,
  isGuest
}: {
  videoLink: string;
  id: number;
  isGuest?: boolean;
}) => {
  const [isVideoPlay, setIsVideoPlay] = useState(false);
  const [startWatchingBonus] = useStartPlayBonusMaterialMutation();
  const [endWatchingBonus] = useEndPlayBonusMaterialMutation();
  const [startWatchingGuest] = useStartPlayMeditationMutation();
  const [endWatchingGuest] = useEndPlayMeditationMutation();

  const startWatch = () => {
    isGuest
      ? void startWatchingGuest({ id: id })
      : void startWatchingBonus({ id: id });
  };

  const endWatch = () => {
    isGuest
      ? void endWatchingGuest({ id: id })
      : void endWatchingBonus({ id: id });
  };

  const setIsVideoPlayFalseAfterDelay = () => {
    setTimeout(() => {
      setIsVideoPlay(false);
    }, 1000);
  };

  return (
    <div className={styles.player_container}>
      {!isVideoPlay && (
        <div className={styles.player}>
          <PlayIcon
            onClick={() => setIsVideoPlay(true)}
            className={styles.play}
          />
        </div>
      )}
      {isVideoPlay && (
        <Vimeo
          video={videoLink}
          autoplay
          className={styles.player}
          color="ce3591"
          onPlay={() => startWatch()}
          onEnd={() => endWatch()}
          onError={() => setIsVideoPlayFalseAfterDelay()}
        />
      )}
    </div>
  );
};
