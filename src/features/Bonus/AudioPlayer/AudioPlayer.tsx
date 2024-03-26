import ReactAudioPlayer from 'react-audio-player';

import styles from './AudioPlayer.module.scss';
import { type BonusMaterial } from '../../../entities/apiTypes';

export const AudioPlayer = ({ meditation }: { meditation: BonusMaterial }) => {
  return (
    <div className={styles.audio_container}>
      <p>{meditation.title}</p>
      <ReactAudioPlayer
        controls
        controlsList="nodownload"
        crossOrigin="anonymous"
        src={meditation.contentUrl}
        className={styles.player}
      ></ReactAudioPlayer>
    </div>
  );
};
