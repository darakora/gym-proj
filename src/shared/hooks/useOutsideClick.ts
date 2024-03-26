import { useEffect, useRef } from 'react';

export const useOutsideClick = ({
  callback,
  reset
}: {
  callback?: () => void;
  reset?: () => void;
}) => {
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reference.current &&
        !reference.current.contains(event.target as Node)
      ) {
        callback && callback();
      }
      if (
        reference.current &&
        (event.target as Node).contains(document.querySelector('#backHome'))
      ) {
        reset && reset();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, reset]);

  return reference;
};
