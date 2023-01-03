export const numGen = (min: number, max: number, size?: number) : number | number[] => {
  const randomNumbers: number[] = [];
  if (!size) return Math.floor(Math.random() * (max - min + 1)) + min;
  else {
    for (let i = 0; i < size; i++) {
      randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }
  return randomNumbers;
};
