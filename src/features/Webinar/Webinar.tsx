import { type ChangeEvent, useState, useEffect } from 'react';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'react-headless-accordion';

import { ReactComponent as ArrowIcon } from '~/assets/icons/Arrow.svg';
import { ReactComponent as LikeIcon } from '~/assets/icons/Like.svg';
import { ReactComponent as PlayIcon } from '~/assets/icons/play.svg';
import { ReactComponent as ReplyIcon } from '~/assets/icons/ReplyIcon.svg';
import { UserIcon } from '~/features/Header/UserIcon/UserIcon';
import { useDebounce } from '~/shared/hooks/useDeBounce';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import {
  useAddQuestionMutation,
  useGetWebinarQuery,
  useGetWebinarSeenMutation,
  useUndoReactionMutation,
  useUpdateLikesMutation
} from '~/store/api/webinars/webinars.api';

import styles from './Webinar.module.scss';
import { ZoomFrame } from './ZoomFrame/ZoomFrame';
import { Loader } from '../../shared/ui/Loader/Loader';
import { getFormattedGermanDate } from '../../shared/utils/getFormattedDate';

const getExpertInitials = (fullName: string) => {
  return fullName.split(' ').length > 0
    ? fullName
        .split(' ')
        .slice(0, 2)
        .map((name) => name.charAt(0).toUpperCase())
        .join('')
    : fullName.slice(0, 1).charAt(0).toUpperCase();
};

export const WebinarEvent = ({ id }: { id: string }) => {
  const {
    data: webinar,
    refetch,
    isLoading: isWebinarLoading
  } = useGetWebinarQuery(+id);

  const [inputText, setInputText] = useState('');
  const [outputs, setOutputs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [likeStatus, setlikeStatus] = useState(
    webinar ? webinar.likeStatus : 'none'
  );
  const [countLike, setCountLike] = useState(webinar ? webinar.likeCount : 0);

  const [recordingUrl, setRecordingUrl] = useState(webinar?.recordingUrl);
  const [isMounted, setIsMounted] = useState(false);
  const [isMeetingClicked, setIsMeetingClicked] = useState(false);

  const [updateLikes] = useUpdateLikesMutation();
  const [undoReaction] = useUndoReactionMutation();
  const [makeSeen] = useGetWebinarSeenMutation();
  const [question] = useAddQuestionMutation();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    setOutputs([...outputs, inputText]);
    void question({ payload: { text: inputText, webinarId: id } });
    setInputText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setInputText(inputText + '\n');
      void question({ payload: { text: inputText, webinarId: id } });
      setInputText('');
    }
  };

  const startWatch = () => {
    if (!webinar?.isSeen) {
      void makeSeen({ id: id });
    }
  };

  const changeLikes = () => {
    if (likeStatus === 'Like') {
      setlikeStatus('None');
      setCountLike(countLike - 1);
    }
    if (likeStatus === 'None') {
      setlikeStatus('Like');
      setCountLike(countLike + 1);
    }
  };

  const clickMeeting = () => {
    setIsMeetingClicked((hasBeenClicked) => !hasBeenClicked);
  };

  const updateRecordingUrl = () => {
    refetch()
      .then((response) => setRecordingUrl(response.data?.recordingUrl))
      .catch(() => {
        throw new Error('Fetch Error');
      });
  };

  const changedReaction = useDebounce(likeStatus, 200);

  useEffect(() => {
    if (isMounted) {
      if (changedReaction === 'Like') {
        void updateLikes({ id: id });
      }
      if (changedReaction === 'None') {
        void undoReaction({ id: id });
      }
    } else setIsMounted(true);
  }, [changedReaction, isMounted, undoReaction, updateLikes, id]);

  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };

  return isWebinarLoading ? (
    <Loader />
  ) : (
    webinar && (
      <div className={styles.container}>
        <div
          className={styles.containerInner}
          key={webinar.id}
        >
          <div className={styles.inner}>
            <h2>{webinar.title}</h2>
            <div className={styles.dateContainer}>
              <span>Datum:</span>
              <span>{getFormattedGermanDate(webinar.dateIso)}</span>
            </div>
            {isMeetingClicked ? (
              <>
                {recordingUrl ? (
                  <div className={styles.video}>
                    <ZoomFrame url={recordingUrl} />
                  </div>
                ) : (
                  <div className={styles.loading_video}>
                    <div className={styles.loader}>
                      <div className={styles.bounce1}></div>
                      <div className={styles.bounce2}></div>
                      <div className={styles.bounce3}></div>
                    </div>
                    <p>Webinar ist noch im Upload...</p>
                    <p>
                      Wenn es festzustecken scheint, klicken Sie bitte auf die
                      Schaltfläche
                    </p>
                    <Button
                      appearance="secondary"
                      className={styles.refetch_button}
                      onClick={updateRecordingUrl}
                    >
                      Erneut abrufen
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.video}>
                <PlayIcon
                  className={styles.play}
                  onClick={() => {
                    clickMeeting();
                    startWatch();
                  }}
                />
              </div>
            )}

            <div className={styles.likes}>
              <span>Gefällt das Video?</span>
              <div className={styles.btnWrapper}>
                <div className={styles.likeInner}>
                  <Button
                    icon={<LikeIcon />}
                    onClick={() => changeLikes()}
                    className={`${
                      likeStatus === 'Like' ? styles.btnLike : styles.none
                    }`}
                  >
                    {countLike}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.titleQuestion}>
            <div className={styles.titleQuestionInner}>
              <span>Gibt es eine Frage zum Video?</span>
              <span>
                Hier können Sie es hinterlassen, und wir werden es gerne so
                schnell wie möglich beantworten!
              </span>
            </div>
            <div>
              <div className={styles.textArea}>
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Videokommentar..."
                  onKeyDown={handleKeyDown}
                />
                <Button
                  onClick={handleButtonClick}
                  appearance={ButtonAppearance.Secondary}
                  className={styles.btnNewQuestion}
                >
                  Schicken
                </Button>
              </div>
              <div className={styles.wrapperQandA}>
                {webinar.questions &&
                  webinar.questions.slice(0, 1).map((question) => (
                    <div
                      className={styles.expertContainer}
                      key={webinar.id}
                    >
                      <div className={styles.user}>
                        <div>{<UserIcon url={question.profilePhotoUrl} />}</div>
                        <div className={styles.dateUser}>
                          <div>
                            {question.name} {question.surname}
                          </div>
                          <div>{question.questionDate}</div>
                        </div>
                      </div>
                      <div>
                        <div className={styles.questionUser}>
                          {question.question}
                        </div>
                        {question.answer && (
                          <div className={styles.answerInner}>
                            <div className={styles.replyIcon}>
                              <ReplyIcon />
                            </div>
                            <div className={styles.wrapperAnswer}>
                              <div className={styles.answer}>
                                <div className={styles.expertIcon}>
                                  {getExpertInitials(question.defendantName)}
                                </div>
                                <div className={styles.expertAnswer}>
                                  <span>{question.defendantName}</span>
                                  <div>{question.answerDate}</div>
                                </div>
                              </div>
                              <div className={styles.questionUser}>
                                {question.answer}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {webinar.questions && webinar.questions.length > 1 && (
                  <div key={webinar.id}>
                    <Accordion>
                      <AccordionItem>
                        <AccordionBody>
                          <div className={styles.wrapper}>
                            {webinar.questions.slice(1).map((question) => (
                              <div
                                className={styles.expertContainer}
                                key={question.question}
                              >
                                <div className={styles.user}>
                                  <div>
                                    {
                                      <UserIcon
                                        url={question.profilePhotoUrl}
                                      />
                                    }
                                  </div>
                                  <div className={styles.dateUser}>
                                    <div>{question.name}</div>
                                    <div>{question.questionDate}</div>
                                  </div>
                                </div>
                                <div>
                                  <div className={styles.questionUser}>
                                    {question.question
                                      .split('\n')
                                      .map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                      ))}
                                  </div>
                                  {question.answer && (
                                    <div className={styles.answerInner}>
                                      <div className={styles.replyIcon}>
                                        <ReplyIcon />
                                      </div>
                                      <div className={styles.wrapperAnswer}>
                                        <div className={styles.answer}>
                                          <div className={styles.expertIcon}>
                                            {getExpertInitials(
                                              question.defendantName
                                            )}
                                          </div>
                                          <div className={styles.expertAnswer}>
                                            <span>
                                              {question.defendantName}
                                            </span>
                                            <div>{question.answerDate}</div>
                                          </div>
                                        </div>
                                        <div className={styles.questionUser}>
                                          {question.answer}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionBody>
                        <AccordionHeader
                          className={
                            isOpen
                              ? styles.accordion_btn
                              : styles.accordion_btn_disabled
                          }
                          onClick={toggleMenu}
                        >
                          <p>Mehr Kommentare laden</p>

                          <ArrowIcon className={styles.switch_icon} />
                        </AccordionHeader>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
