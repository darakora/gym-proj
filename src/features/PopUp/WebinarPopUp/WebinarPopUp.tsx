import { useEffect, useState } from 'react';

import { type AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_BASE_URL } from '~/api/constant';
import { gymInstance } from '~/api/instance';
import { ReactComponent as ClosePopUpIcon } from '~/assets/icons/popup/close.svg';
import { ReactComponent as LikeIcon } from '~/assets/icons/popup/like.svg';
import { ReactComponent as LinkIcon } from '~/assets/icons/popup/link.svg';
import { type Webinar } from '~/entities/apiTypes';
import { useDebounce } from '~/shared/hooks/useDeBounce';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { Loader } from '~/shared/ui/Loader/Loader';
import {
  useStartWatchWebinarMutation,
  useUndoReactionMutation,
  useUpdateLikesMutation
} from '~/store/api/webinars/webinars.api';

import styles from './WebinarPopUp.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { getFormattedGermanDate } from '../../../shared/utils/getFormattedDate';

export const WebinarPopUp = ({
  onClick,
  webinar
}: {
  onClick: () => void;
  webinar: Webinar;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [startWatch] = useStartWatchWebinarMutation();
  const [likeStatus, setlikeStatus] = useState('');
  const [countLike, setCountLike] = useState(0);
  const [webinarData, setWebinarData] = useState<Webinar | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    gymInstance
      .get(`${BACKEND_BASE_URL}Webinars/${webinar.id}`)
      .then((response: AxiosResponse<Webinar>) => {
        setWebinarData(response.data);
        setlikeStatus(response.data.likeStatus);
        setCountLike(response.data.likeCount);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [webinar.id]);

  useEffect(() => {
    void startWatch({ id: webinar.id });
  }, [webinar, startWatch]);

  const closePopUp = () => {
    setIsOpen(false);
    onClick();
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

  const changedReaction = useDebounce(likeStatus, 200);

  const [updateLikes] = useUpdateLikesMutation();
  const [undoReaction] = useUndoReactionMutation();

  useEffect(() => {
    if (isMounted) {
      if (changedReaction === 'Like') {
        void updateLikes({ id: webinar.id });
      }
      if (changedReaction === 'None') {
        void undoReaction({ id: webinar.id });
      }
    }
    if (changedReaction === webinarData?.likeStatus) {
      setIsMounted(true);
    }
  }, [
    changedReaction,
    isMounted,
    undoReaction,
    updateLikes,
    webinar.id,
    webinarData?.likeStatus
  ]);

  return (
    <div
      className={isOpen ? styles.popup_overflow : styles.popup_overflow_hidden}
    >
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <>
            <Button
              className={styles.close_button}
              appearance="secondary2"
              icon={<ClosePopUpIcon />}
              onClick={closePopUp}
            />
            <h1>{webinar && webinar.title}</h1>
            <div className={styles.date}>
              <p>Datum:</p>
              <span>{webinar && getFormattedGermanDate(webinar.dateIso)}</span>
            </div>
            <div className={styles.reactions}>
              <Button
                icon={<LikeIcon />}
                onClick={() => changeLikes()}
                appearance={ButtonAppearance.Secondary2}
                className={`${styles.reaction_button} ${
                  likeStatus === 'Like' ? styles.btnLike : styles.none
                } ${likeStatus === 'None' ? styles.none : ''}`}
              >
                {countLike}
              </Button>
            </div>
            {webinar && (
              <Link
                onClick={closePopUp}
                className={styles.link}
                to={`/webinar/${webinar?.id}`}
              >
                <LinkIcon />
                Video ansehen
              </Link>
            )}
          </>
        )}
      </div>
      {error?.message}
    </div>
  );
};
