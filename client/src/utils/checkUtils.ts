export const isEmptyArray = (arr: any[]) => {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
};
