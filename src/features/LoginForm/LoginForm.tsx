import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { InputField } from '~/shared/ui/InputField/InputField';

import styles from './LoginForm.module.scss';
import { FETCH_STATUS } from '../../entities/fetchStatus';
import { Button } from '../../shared/ui/Button/Button';
import { store } from '../../store/store';
import { useAppDispatch } from '../../store/store.types';
import { createTokens } from '../../store/user/user.api';

interface FormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tokenState = store.getState().user.tokens;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData): void => {
    void dispatch(createTokens(data));
  };

  return (
    <div className={styles['login-form-container']}>
      <div className={styles['title-login']}>
        <span>Mein</span>
        <span>GYM</span>
      </div>
      <form
        className={styles['container']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles['form-group']}>
          <InputField
            label="E-Mail-Adresse"
            id="email"
            error={errors.email?.message}
            shouldFitContainer
            className={styles['email-input']}
            {...register('email', {
              required: 'Das Feld darf nicht leer sein',
              pattern: {
                value: /^[\w%+.-]+@[\w.-]+\.[a-z]{2,}$/i,
                message: 'Schreiben Sie Ihre E-Mail-Adresse richtig'
              }
            })}
            placeholder="Email"
          />
        </div>

        <div className={styles['form-group']}>
          <InputField
            label="Passwort"
            id="password"
            error={errors.password?.message}
            shouldFitContainer
            className={styles['password-input']}
            {...register('password', {
              required: 'Das Feld darf nicht leer sein',
              minLength: {
                value: 8,
                message: 'Mindestlänge von 8 Zeichen'
              }
            })}
            type="password"
            placeholder="●●●●●●●"
          />
        </div>
        {tokenState.status === FETCH_STATUS.ERROR ? (
          tokenState.error.statusCode === 401 ? (
            <p className={styles.error}>Falsche Email oder Passwortt</p>
          ) : (
            <p className={styles.error}>{tokenState.error.message}</p>
          )
        ) : null}
        <div className={styles['buttons-container']}>
          <Button
            type="submit"
            appearance="secondary"
            className={styles['login-btn']}
          >
            Login
          </Button>
          <Button
            className={styles['reset-password-btn']}
            appearance="secondary2"
            onClick={() => navigate('/reset')}
          >
            Passwort zurücksetzen?
          </Button>
        </div>
      </form>
    </div>
  );
};
