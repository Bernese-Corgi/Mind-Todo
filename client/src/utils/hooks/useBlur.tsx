import { useEffect } from 'react';

const useBlur = (callback, execCondition) => {
  useEffect(() => {
    callback();

    if (execCondition) window.addEventListener('click', callback);

    return () => {
      window.removeEventListener('click', callback);
    };
  }, [callback, execCondition]);
};

export default useBlur;
