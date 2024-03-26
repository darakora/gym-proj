/* eslint-disable import/no-duplicates -- Not multiple import*/
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
/* eslint-enable */

export const getFormattedGermanDate = (date: string) => {
  const formattedDate = format(new Date(date), 'MMMM d, yyyy H:mm', {
    locale: de
  });

  return formattedDate;
};
