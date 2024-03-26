import {
  type Meditation,
  type BonusMaterial
} from '../../../entities/apiTypes';

export const getNextId = (
  array: [BonusMaterial] | [Meditation],
  id: number
): number => {
  const currentIndex = array.findIndex((item) => +item.id === +id);

  const nextItem = array[currentIndex + 1];
  const nextItemId = +nextItem.id;

  return nextItemId;
};

export const getPreviousId = (
  array: [BonusMaterial] | [Meditation],
  id: number
): number => {
  const currentIndex = array.findIndex((item) => +item.id === +id);

  const previousItem = array[currentIndex - 1];
  const previousItemId = +previousItem.id;
  return previousItemId;
};
