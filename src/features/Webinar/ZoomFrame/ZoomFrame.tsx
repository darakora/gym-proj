import styles from './ZoomFrame.module.scss';

export const ZoomFrame = ({ url }: { url: string }) => {
  return (
    <iframe
      src={url}
      className={styles.container}
      allowFullScreen
    />
  );
};
