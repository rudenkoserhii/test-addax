import { useEffect } from 'react';
import Notiflix from 'notiflix';

export const Loading = ({ isVisible }: { isVisible: boolean }) => {
  useEffect(() => {
    if (isVisible) {
      Notiflix.Loading.circle();
    } else {
      Notiflix.Loading.remove();
    }

    return () => {
      Notiflix.Loading.remove();
    };
  }, [isVisible]);

  return null;
};
