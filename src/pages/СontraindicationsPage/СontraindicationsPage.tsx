import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './СontraindicationsPage.module.scss';
import { Button } from '../../shared/ui/Button/Button';
import { Loader } from '../../shared/ui/Loader/Loader';
import { Navbar } from '../../shared/ui/Navbar/Navbar';
import { PageText } from '../../shared/ui/PageText/PageText';
import { useGetTopicTextQuery } from '../../store/api/topics/topics';
import { useUpdateConfirmationStateMutation } from '../../store/api/user/user.api';
import { useAppDispatch, useAppSelector } from '../../store/store.types';
import { fetchUser } from '../../store/user/user.api';
import { selectUser } from '../../store/user/user.selector';

const routes = [
  {
    id: 'general_info',
    title: 'Wichtige Informationen ',
    path: '/contraindications'
  }
];

interface FormData {
  isConfirmed: boolean;
}

export const СontraindicationsPage = () => {
  const user = useAppSelector(selectUser);

  const [updateConfirmationState] = useUpdateConfirmationStateMutation();

  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      isConfirmed: user?.isConfirmed
    }
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    void updateConfirmationState({ payload: data })
      .unwrap()
      .then(
        void setTimeout(
          () => void dispatch(fetchUser()).then(void navigate('/')),
          500
        )
      );
  };

  const { data: topicText, isLoading: isTopicTextLoading } =
    useGetTopicTextQuery('contraindications');

  return isTopicTextLoading ? (
    <>
      <Navbar routes={routes} />
      <Loader />
    </>
  ) : (
    topicText && (
      <div className={styles.container}>
        <Navbar routes={routes} />
        <h1>{topicText.displayName}</h1>
        <div className={styles.content_container}>
          <div className={styles.content}>
            <PageText text={topicText.text} />
            <form
              className={styles.confirm_form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.confirm_input}>
                <input
                  type="checkbox"
                  {...register('isConfirmed')}
                />
                <label>
                  Ich bestätige, dass ich die Informationen zur Kenntnis
                  genommen habe.
                </label>
              </div>
              <Button
                appearance="secondary"
                className={styles.form_button}
                disabled={!watch('isConfirmed')}
              >
                Zugang zum Club
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
