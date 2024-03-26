import { useState } from 'react';

import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { InputField } from '~/shared/ui/InputField/InputField';

import styles from './ResetPassword.module.scss';
import { BACKEND_BASE_URL } from '../../api/constant';
import { Button } from '../../shared/ui/Button/Button';

interface FormData {
  email: string;
}

interface ResetPasswordError {
  message: string;
}

export const ResetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState<ResetPasswordError | null>(
    null
  );

  const onSubmit = (data: FormData): void => {
    axios
      .post<void, AxiosResponse<void>, FormData>(
        `${BACKEND_BASE_URL}auth/reset`,
        {
          email: data.email
        }
      )
      .then(() => navigate('/reset-success'))
      .catch((error: AxiosError) =>
        setErrorMessage(error.response?.data as ResetPasswordError)
      );
  };

  return (
    <div className={styles['reset-form-container']}>
      <span className={styles['title-reset']}>Passwort zurücksetzen</span>
      <p className={styles['description']}>
        Bitte geben Sie Ihre Email Adresse ein und wir senden Ihnen einen Link
        zum Zurücksetzen Ihres Passworts.
      </p>
      <form
        className={styles['reset-form']}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles['form-group']}>
          <InputField
            label="Email"
            type="email"
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
        {errorMessage && <p className={styles.error}>{errorMessage.message}</p>}{' '}
        <Button
          type="submit"
          appearance="secondary"
          className={styles['reset-btn']}
          shouldFitContainer
        >
          Passwort zurucksetzen
        </Button>
      </form>
    </div>
  );
};
