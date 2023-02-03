import { Store } from 'react-notifications-component';
import { NOTIFICATION_TYPE } from 'react-notifications-component/dist/src/typings';

export const numGen = (min: number, max: number, size?: number): number | number[] => {
  const randomNumbers: number[] = [];
  if (!size) return Math.floor(Math.random() * (max - min + 1)) + min;
  else {
    for (let i = 0; i < size; i++) {
      let newNum = Math.floor(Math.random() * (max - min + 1)) + min;
      // Uniqueness check
      while (randomNumbers.includes(newNum)) {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      randomNumbers.push(newNum);
    }
  }
  return randomNumbers;
};

export const addNotification = (title: string, message: string, type: NOTIFICATION_TYPE) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
