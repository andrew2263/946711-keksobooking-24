const getRandomInt = (min, max) => {
  if (min >= 0 && max >= 0 && max >= min) {
    return Math.round(Math.random()*(max-min) + min);
  }
  throw new Error('Введите корректные значения');
};

const getRandomFloat = (min, max, numberDecimals) => {
  if (min >= 0 && max >= 0 && max >= min && numberDecimals >= 0) {
    const random = Math.random()*(max-min) + min;
    const pow = Math.pow(10, numberDecimals);
    return Math.round(random * pow) / pow;
  }
  throw new Error('Введите корректные значения');
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt, getRandomFloat, isEscapeKey };
