import usePrevious from './usePrevious';

const useCompare = (value: any) => {
  const prevValue = usePrevious(value);
  return prevValue !== value;
};

export default useCompare;
