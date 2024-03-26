import { useState, useEffect } from 'react';

import { CSSTransition } from 'react-transition-group';

import styles from './Animation.module.scss';

export const Animation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <CSSTransition
      in={isLoading}
      timeout={300}
      className={styles.pageloader}
      unmountOnExit
    >
      <div className={styles.pageloader}>
        <div className={styles.loader}></div>
      </div>
    </CSSTransition>
  );
};
