import { ReactComponent as ExpertIcon } from '~/assets/icons/ExpertIcon.svg';
import { type NotificationQuestions } from '~/entities/apiTypes';
import { UserIcon } from '~/features/Header/UserIcon/UserIcon';

import styles from './NotificationsQuestions.module.scss';
import { useAppSelector } from '../../../store/store.types';
import { selectUser } from '../../../store/user/user.selector';

export const NotificationsQuestions = ({
  questions
}: {
  questions: NotificationQuestions[];
}) => {
  const user = useAppSelector(selectUser);

  return (
    <div className={styles.container}>
      {questions.map((question) => (
        <div
          className={styles.QandAContainer}
          key={question.questionDate}
        >
          <div className={styles.inner}>
            <p>Webinar-Frage: {question.webinarTitle}</p>
            <div className={styles.innerQuestion}>
              {user && <UserIcon user={user} />}
              <div className={styles.questionSection}>
                <div className={styles.questions}>
                  {question.question.split('\n').map((paragraph, index) => (
                    <span key={index}>{paragraph}</span>
                  ))}
                  <div className={styles.date}>{question.questionDate}</div>
                </div>
              </div>
            </div>
            <div className={styles.innerAnswer}>
              <div className={styles.answerContainer}>
                <div>
                  <div className={styles.answers}>
                    {question.answer.split(' ')[0].includes('Vielen') ? (
                      question.answer
                        .split('\n')
                        .slice(1)
                        .map((paragraph, index) => (
                          <span
                            key={index}
                            className={styles.answerInner}
                          >
                            {paragraph}
                          </span>
                        ))
                    ) : (
                      <span className={styles.answerInner}>
                        {question.answer}
                      </span>
                    )}

                    <div className={styles.dateAnswer}>
                      {question.answerDate}
                    </div>
                  </div>
                </div>
                <div className={styles.expertIcon}>
                  <ExpertIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
