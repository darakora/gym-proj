import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './ResetPasswordResult.module.scss';
import { Button } from '../../shared/ui/Button/Button';

export const ResetPasswordResult = () => {
  useForm<FormData>();
  const navigate = useNavigate();

  return (
    <div className={styles['reset-container']}>
      <span className={styles['title-reset']}>Passwort zurucksetzen</span>
      <p className={styles['description']}>
        Wir haben Ihnen eine Email gesendet.
      </p>
      <Button
        type="button"
        appearance="secondary"
        className={styles['back-btn']}
        onClick={() => navigate('/login')}
      >
        Zurück
      </Button>
    </div>
  );
};
