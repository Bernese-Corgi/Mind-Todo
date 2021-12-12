export const chunkString = (str: string, length: number) =>
  str.match(new RegExp('.{1,' + length + '}', 'g'));

export const chunkDateString = (date: string) =>
  date.slice(0, 10).replaceAll('-', ' / ');

export const changeFirstStrToUpper = (str: string) =>
  str[0].toUpperCase() + str.slice(1);
