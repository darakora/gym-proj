import { useEffect, useState } from 'react';

import {
  addMinutes,
  format,
  formatISO,
  isFuture,
  isSameMonth,
  isSameYear
} from 'date-fns';

import { ReactComponent as NextIcon } from '~/assets/icons/Next.svg';
import { ReactComponent as PreviousIcon } from '~/assets/icons/Previous.svg';
import { ReactComponent as SeenIcon } from '~/assets/icons/SeenIcon.svg';
import { ReactComponent as UnSeenIcon } from '~/assets/icons/UnseenIcon.svg';
import { type Webinar } from '~/entities/apiTypes';
import { Button } from '~/shared/ui/Button/Button';
import { useGetWebinarsQuery } from '~/store/api/webinars/webinars.api';

export const colors = ['#D3F0F0', '#F5FDFD', '#E884C1', '#FBC0E4'];

import styles from './ScheduleCalendar.module.scss';
import {
  daysOfWeekGerman,
  getPreviousMonday,
  getRequestData
} from './ScheduleCalendar.utils';
import { NotificationPopUp } from '../PopUp/NotificationPopUp/NotificationPopUp';
import { WebinarPopUp } from '../PopUp/WebinarPopUp/WebinarPopUp';

export const ScheduleCalendar = () => {
  const [startDate, setStartDate] = useState(getPreviousMonday());
  const [isFuturePopUpCalled, setIsFuturePopUpCalled] = useState(false);
  const [isPastPopUpCalled, setIsPastPopUpCalled] = useState(false);
  const [popUpWebinar, setPopUpWebinar] = useState<Webinar>({} as Webinar);
  const [events, setEvents] = useState<Webinar[]>([]);

  const { data: newWebinars } = useGetWebinarsQuery(getRequestData(startDate));

  useEffect(() => {
    if (newWebinars) setEvents(newWebinars);
  }, [newWebinars, startDate]);

  const toggleFuturePopUp = () => {
    setIsFuturePopUpCalled((hasBeenClicked) => !hasBeenClicked);
  };

  const togglePastPopUp = () => {
    setIsPastPopUpCalled((hasBeenClicked) => !hasBeenClicked);
  };

  const nextWeek = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + 7);
    setStartDate(newDate);
  };

  const previousWeek = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - 7);
    setStartDate(newDate);
  };

  const generateDatesForWeek = () => {
    const dates = [];
    const currentDate = new Date(startDate);
    for (let index = 0; index < 7; index++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const weekDates = generateDatesForWeek();

  const currentDay = new Date();

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const disableNextWeekButton = (): boolean => {
    return startDate >= currentDay ? true : false;
  };

  return (
    <div className={styles.wrapper}>
      {isFuturePopUpCalled && (
        <NotificationPopUp
          onClick={toggleFuturePopUp}
          webinar={popUpWebinar}
        />
      )}
      {isPastPopUpCalled && (
        <WebinarPopUp
          onClick={togglePastPopUp}
          webinar={popUpWebinar}
        />
      )}
      <div className={styles.monthContainer}>
        {isSameMonth(startDate, weekDates[6])
          ? format(startDate, 'dd')
          : isSameYear(startDate, weekDates[6])
          ? format(startDate, 'dd.MM')
          : format(startDate, 'dd.MM.yyyy')}{' '}
        - {format(weekDates[6], 'dd.MM.yyy')}
      </div>
      <div className={styles.btnContainer}>
        <Button
          onClick={previousWeek}
          icon={<PreviousIcon />}
          className={styles.btnInner}
          disabled={startDate <= twoWeeksAgo}
        ></Button>
        <Button
          onClick={nextWeek}
          icon={<NextIcon />}
          className={styles.btnInner}
          disabled={disableNextWeekButton()}
        ></Button>
      </div>
      <div className={styles.container}>
        {weekDates.map((date, index) => (
          <div
            key={date.toISOString()}
            className={styles.daysContainer}
          >
            <div className={styles.daysInner}>
              <div>{date.getDate()}</div>
              <div>{daysOfWeekGerman[index]}</div>
            </div>
            {!events.some(
              (event) =>
                new Date(event.dateIso).getDate() ===
                new Date(date.toISOString()).getDate()
            ) && <div className={styles.emptyEvents}></div>}
            <div className={styles.eventInner}>
              {events.map((event) => {
                const eventDate = new Date(
                  formatISO(
                    addMinutes(new Date(event.dateIso), event.lengthMin)
                  )
                );
                if (
                  new Date(event.dateIso).getDate() ===
                  new Date(date.toISOString()).getDate()
                ) {
                  return (
                    <div
                      key={event.title}
                      className={styles.eventBasic}
                      style={{
                        background: event.color,
                        borderColor: event.borderColor
                      }}
                      onClick={() => {
                        setPopUpWebinar(event);
                        isFuture(eventDate)
                          ? toggleFuturePopUp()
                          : togglePastPopUp();
                      }}
                    >
                      {event.title}
                      <div className={styles.time}>
                        {format(new Date(event.dateIso), 'HH:mm')}
                      </div>
                      {isFuture(eventDate) ? null : (
                        <div className={styles.icon}>
                          {event.isSeen ? <SeenIcon /> : <UnSeenIcon />}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
