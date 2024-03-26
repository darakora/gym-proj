import { useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import styles from './UserInformationForm.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { InputField } from '../../../shared/ui/InputField/InputField';
import { useUpdateUserInfoMutation } from '../../../store/api/user/user.api';
import { useAppDispatch, useAppSelector } from '../../../store/store.types';
import { fetchUser } from '../../../store/user/user.api';
import { selectUser } from '../../../store/user/user.selector';

interface FormData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}

interface UserInfoError {
  status: number;
  data: {
    title: string;
  };
}

export const UserInformationForm = () => {
  const user = useAppSelector(selectUser);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isValid, isDirty }
  } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState<UserInfoError | null>(null);

  const [updateUserInfo, { isLoading: isUpdating }] =
    useUpdateUserInfoMutation();

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData): void => {
    void updateUserInfo({ payload: data })
      .unwrap()
      .then(() => {
        setErrorMessage(null);
        void dispatch(fetchUser());
      })
      .catch((error: UserInfoError) => {
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    reset({
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      phoneNumber: user?.phoneNumber
    });
  }, [user, reset]);

  const checkPasswordStrength = () => {
    if (watch('password')) {
      if (watch('password').length <= 4) {
        return 'light';
      } else if (
        watch('password').length > 4 &&
        !/[A-Z]/.test(watch('password'))
      ) {
        return 'medium';
      } else if (
        /[A-Z]/.test(watch('password')) &&
        watch('password').length > 8
      ) {
        return 'high';
      }
    } else {
      return null;
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && (
        <p className={styles.error}>Error: {errorMessage.data.title}</p>
      )}
      <Controller
        control={control}
        name="name"
        defaultValue={user?.name}
        rules={{
          validate: (value: string) => {
            return (
              !value.startsWith(' ') ||
              'Vorname darf nicht mit einem Leerzeichen beginnen'
            );
          }
        }}
        render={({ field }) => (
          <InputField
            label="Vorname"
            id="name"
            shouldFitContainer
            {...field}
            onChange={(event) => {
              field.onChange(event);
              void trigger('name');
            }}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="surname"
        defaultValue={user?.surname}
        rules={{
          validate: (value: string) => {
            return (
              !value.startsWith(' ') ||
              'Nachname darf nicht mit einem Leerzeichen beginnen'
            );
          }
        }}
        render={({ field }) => (
          <InputField
            label="Nachname"
            id="surname"
            shouldFitContainer
            {...field}
            onChange={(event) => {
              field.onChange(event);
              void trigger('surname');
            }}
            error={errors.surname?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        defaultValue={user?.email}
        rules={{
          required: 'Das Feld darf nicht leer sein',
          pattern: {
            value: /^[\w%+.-]+@[\w.-]+\.[a-z]{2,}$/i,
            message: 'Schreiben Sie Ihre E-Mail-Adresse richtig'
          }
        }}
        render={({ field }) => (
          <InputField
            label="E-Mail-Adresse"
            id="email"
            readOnly
            {...field}
            onChange={(event) => {
              field.onChange(event);
              void trigger('email');
            }}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        defaultValue={user?.phoneNumber}
        rules={{
          required: 'Das Feld darf nicht leer sein',
          pattern: {
            value: /^[\d+][\d ()-]{4,14}\d$/,
            message: 'Schreiben Sie Ihre Telefonnummer richtig'
          }
        }}
        render={({ field }) => (
          <InputField
            label="Telefonnummer"
            id="phone"
            type="tel"
            {...field}
            onChange={(event) => {
              field.onChange(event);
              void trigger('phoneNumber');
            }}
            error={errors.phoneNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          minLength: {
            value: 8,
            message:
              'Mindestlänge von 8 Zeichen. Das Passwort muss eine Mindeststärke von Medium haben'
          }
        }}
        defaultValue=""
        render={({ field }) => (
          <InputField
            type="password"
            label="Neues Passwort setzen"
            id="password"
            {...field}
            onChange={(event) => {
              field.onChange(event);
              void trigger('password');
            }}
            passwordStrength={checkPasswordStrength()}
            error={errors.password?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="passwordConfirmation"
        rules={{
          validate: (value: string) => {
            if (watch('password') !== value) {
              return 'Ihre Passwörter stimmen nicht überein';
            }
            return true;
          }
        }}
        defaultValue=""
        render={({ field }) => (
          <InputField
            type="password"
            label="Neues Passwort wiederholen"
            id="confirmPassword"
            {...field}
            onChange={(event) => {
              field.onChange(event);
              void trigger('passwordConfirmation');
            }}
            error={errors.passwordConfirmation?.message}
          />
        )}
      />
      <Button
        appearance="secondary"
        className={styles.form_btn}
        type="submit"
        disabled={!isValid || isUpdating || !isDirty}
      >
        Aktualisieren
      </Button>
    </form>
  );
};
