import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import styles from './NotificationForm.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { useUpdateUserNotificationsSettingsMutation } from '../../../store/api/user/user.api';
import { useAppDispatch, useAppSelector } from '../../../store/store.types';
import { fetchUser } from '../../../store/user/user.api';
import { selectUser } from '../../../store/user/user.selector';

interface FormInput {
  /* eslint-disable @typescript-eslint/naming-convention -- Api requires */
  emailNotification: boolean;
  smsNotification: boolean;
  /* eslint-enable */
}

interface NotificationsError {
  status: number;
  data: {
    title: string;
  };
}

export const NotificationForm = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<FormInput>({
    defaultValues: {
      emailNotification: user?.emailNotification,
      smsNotification: user?.smsNotification
    }
  });

  const [updateUserNotificationsSettings] =
    useUpdateUserNotificationsSettingsMutation();

  const [errorMessage, setErrorMessage] = useState<NotificationsError | null>(
    null
  );

  const onSubmit = (data: FormInput): void => {
    setTimeout(() => {
      console.warn('Form data submitted:', data);
    }, 1000);
    void updateUserNotificationsSettings({ payload: data })
      .unwrap()
      .then(() => {
        setErrorMessage(null);
        void dispatch(fetchUser());
      })
      .catch((error: NotificationsError) => {
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    reset({
      emailNotification: user?.emailNotification,
      smsNotification: user?.smsNotification
    });
  }, [user, reset]);

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className={styles.title}>Ereignisbenachrichtigungen erhalten:</p>
      <div className={styles.checkbox_container}>
        <input
          type="checkbox"
          {...register('smsNotification')}
        ></input>
        <label className={styles.checkbox_label}>per SMS.</label>
      </div>
      <div className={styles.checkbox_container}>
        <input
          type="checkbox"
          {...register('emailNotification')}
        ></input>
        <label className={styles.checkbox_label}>per Email.</label>
      </div>
      <Button
        appearance="secondary"
        className={styles.form_btn}
      >
        Aktualisieren
      </Button>
      {errorMessage && (
        <p className={styles.error}>Error: {errorMessage.data.title}</p>
      )}
    </form>
  );
};
