export const chunkString = (str: string, length: number) =>
  str.match(new RegExp('.{1,' + length + '}', 'g'));
