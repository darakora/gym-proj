import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import styles from './PageText.module.scss';

export const PageText = ({ text }: { text: string }) => {
  return (
    <div className={styles.container}>{parse(DOMPurify.sanitize(text))}</div>
  );
};
