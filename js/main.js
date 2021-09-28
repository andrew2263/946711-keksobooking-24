const getRandomInt = (min, max) => {
  if (min >= 0 && max >= 0 && max >= min) {
    return Math.round(Math.random()*(max-min) + min);
  }
  return 'Введите корректные значения';
};

const getRandomFloat = (min, max, numberDecimals) => {
  if (min >= 0 && max >= 0 && max >= min && numberDecimals >= 0) {
    const random = Math.random()*(max-min) + min;
    const pow = Math.pow(10, numberDecimals);
    return Math.round(random * pow) / pow;
  }
  return 'Введите корректные значения';
};

getRandomInt(1, 47);
getRandomFloat(4.56, 76.78, 4);
