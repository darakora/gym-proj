import { useState } from 'react';

import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';

import { ReactComponent as CheckMark } from '~/assets/icons/popup/checkmark.svg';
import {
  type QuestionPayload,
  useSendQuestionsSupportMutation
} from '~/store/api/notifications/notifications';

import styles from './PopUpForm.module.scss';
import { BACKEND_BASE_URL } from '../../../api/constant';
import { Button } from '../../../shared/ui/Button/Button';
import { InputField } from '../../../shared/ui/InputField/InputField';
import { useAppSelector } from '../../../store/store.types';
import { selectUser } from '../../../store/user/user.selector';
import { POP_UP_APPEARANCE } from '../ServicePopUp/ServicePopUp';

interface FormData {
  subject: string;
  email?: string;
  questionText: string;
}

interface QuestionError {
  data: {
    subject: string;
    email: string;
    questionText: string;
  };
}

export const PopUpForm = ({
  typeQuestion,
  closePopUp
}: {
  typeQuestion: string;
  closePopUp: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();
  const user = useAppSelector(selectUser);

  const [errorMessage, setErrorMessage] = useState<QuestionError | null>(null);
  const [axiosErrorMessage, setAxiosErrorMessage] = useState<AxiosError | null>(
    null
  );
  const [sendQuestionSupport, { isLoading: isSendingQuestionSupport }] =
    useSendQuestionsSupportMutation();

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendQuestionSupportAnonymous = (payload: QuestionPayload) => {
    setIsSending(true);
    axios
      .post<void, AxiosResponse<void>, QuestionPayload>(
        `${BACKEND_BASE_URL}support/anonymous`,
        payload
      )
      .then(() => {
        setIsSending(false);
        setErrorMessage(null);
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
          closePopUp();
        }, 1500);
      })
      .catch((error: AxiosError) => {
        setIsSending(false);
        setAxiosErrorMessage(error);
      });
  };

  const onSubmit = (data: FormData): void => {
    const questionType =
      typeQuestion === POP_UP_APPEARANCE.support ? 'tech' : 'info';

    const payload: QuestionPayload = { questionType: questionType, ...data };

    user
      ? sendQuestionSupport(payload)
          .unwrap()
          .then(() => {
            setErrorMessage(null);
            setIsSent(true);
            setTimeout(() => {
              setIsSent(false);
              closePopUp();
            }, 1500);
          })
          .catch((error: QuestionError) => setErrorMessage(error))
      : sendQuestionSupportAnonymous(payload);
  };

  return (
    <div className={styles.container}>
      {isSent ? (
        <div className={styles.checkMark}>
          <CheckMark />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.pop_up_form}
        >
          {axiosErrorMessage && (
            <p className={styles.error}>{axiosErrorMessage.message}</p>
          )}
          {!user && (
            <div className={styles.input_container}>
              <InputField
                label="Email"
                id="email"
                shouldFitContainer
                className={styles.subject_input}
                {...register('email', {
                  required: 'Das Feld darf nicht leer sein',
                  pattern: {
                    value: /^[\w%+.-]+@[\w.-]+\.[a-z]{2,}$/i,
                    message: 'Schreiben Sie Ihre E-Mail-Adresse richtig'
                  }
                })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
          )}
          <div className={styles.input_container}>
            <InputField
              label="Betreff"
              id="subject"
              shouldFitContainer
              className={styles.subject_input}
              {...register('subject', {
                required: 'Das Feld darf nicht leer sein'
              })}
            />
            {errors.subject && (
              <p className={styles.error}>{errors.subject.message}</p>
            )}
            {errorMessage?.data.subject && (
              <p className={styles.error}>{errorMessage.data.subject}</p>
            )}
          </div>

          <div className={styles.input_container}>
            <label htmlFor={'questionText'}>Deine Nachricht</label>
            <textarea
              id={'questionText'}
              className={styles.message_input}
              {...register('questionText', {
                required: 'Das Feld darf nicht leer sein'
              })}
            />
            {errors.questionText && (
              <p className={styles.error}>{errors.questionText.message}</p>
            )}
            {errorMessage?.data.questionText && (
              <p className={styles.error}>{errorMessage.data.questionText}</p>
            )}
          </div>
          <span>* Pflichtfeld</span>
          <Button
            appearance="secondary"
            className={styles.form_btn}
            disabled={isSending || isSendingQuestionSupport}
          >
            Senden
          </Button>
        </form>
      )}
    </div>
  );
};
