import { useEffect, useState } from 'react';

import { useDebounce } from '~/shared/hooks/useDeBounce';
import { type Habit } from '~/store/api/habits/habit.type';
import {
  useGetHabitsQuery,
  useUpdateHabitsMutation
} from '~/store/api/habits/habits.api';

import styles from './HabitTracker.module.scss';
import { dayNames, habitNames } from './HabitTracker.utils';

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [modifiedHabits, setModifiedHabits] = useState<Habit[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [updateHabits] = useUpdateHabitsMutation();
  const { data: habitsNew } = useGetHabitsQuery();

  useEffect(() => {
    if (habitsNew) setHabits(habitsNew);
  }, [habitsNew]);

  const handleCheckboxChange = (habitId: number, habitDay: number) => {
    const newStatus = habits.map((habit) => {
      if (habit.habit === habitId && habit.day === habitDay) {
        return { ...habit, status: !habit.status };
      }
      return habit;
    });
    setHabits(newStatus);
    const checkedHabit = newStatus.find(
      (habit) => habit.habit === habitId && habit.day === habitDay
    ) as Habit;
    const newModifiedHabits = modifiedHabits.map((habit) => {
      if (
        habit.habit === checkedHabit.habit &&
        habit.day === checkedHabit.day
      ) {
        return checkedHabit;
      }
      return habit;
    });
    if (
      !modifiedHabits.some(
        (habit) =>
          habit.habit === checkedHabit.habit && habit.day === checkedHabit.day
      )
    ) {
      newModifiedHabits.push(checkedHabit);
    }
    setModifiedHabits(newModifiedHabits);
  };

  const changedHabits = useDebounce(modifiedHabits, 500);

  useEffect(() => {
    if (isMounted && changedHabits.length > 0) {
      void updateHabits({ payload: changedHabits });
      setModifiedHabits([]);
    } else {
      setIsMounted(true);
    }
  }, [isMounted, changedHabits, updateHabits]);

  return (
    <div className={styles.habitTracker}>
      <div className={styles.daysContainer}>
        {dayNames.map((day, dayIndex) => (
          <div
            key={Object.keys(day)[0]}
            className={`${styles.dayName} ${dayIndex >= 5 ? styles.saSo : ''}`}
          >
            {Object.keys(day)[0]}
          </div>
        ))}
      </div>
      {habitNames.map((habitName) => (
        <div
          key={Object.keys(habitName)[0]}
          className={styles.habitRow}
        >
          <div className={styles.habitNameContainer}>
            <span className={styles.habitName}>
              {Object.keys(habitName)[0]}
            </span>
          </div>
          <div className={styles.checkboxContainer}>
            {habits
              .filter((item) => item.habit === habitName.habit)
              .map((item) => (
                <label
                  key={item.habit}
                  className={styles.checkboxLabel}
                >
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleCheckboxChange(item.habit, item.day)}
                  />
                  <span className={styles.checkboxCustom}></span>
                </label>
              ))}
          </div>
          <div className={styles.counterContainer}>
            <span className={styles.counter}>{`${
              habits
                .filter((habit) => habit.habit === habitName.habit)
                .filter((item) => item.status).length
            }/7`}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
