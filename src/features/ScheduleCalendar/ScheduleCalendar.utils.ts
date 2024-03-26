export const daysOfWeekGerman = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag'
];

export const getPreviousMonday = () => {
  const today = new Date();
  const day = today.getDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - daysSinceMonday
  );
};

export const getRequestData = (
  previousMonday: Date
): { startYear: number; startMonth: number; startDay: number } => {
  return {
    startYear: previousMonday.getFullYear(),
    startMonth: previousMonday.getMonth() + 1,
    startDay: previousMonday.getDate()
  };
};
