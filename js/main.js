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

const avatarValues = [];

const ARRAY_LENGTH = 10;

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const createOffer = () => {
  const getAvatarValue = () => {
    const index = getRandomInt(0, avatarValues.length - 1);
    const value = avatarValues[index];
    avatarValues.splice(index, 1);
    return (value < 10) ? `0${value}` : `${value}`;
  };

  const getRandomArray = (dataArray) => {
    const arr = [];
    const dataArrayCopy = dataArray.slice();
    for (let it = 0; it < getRandomInt(1, dataArray.length); it++) {
      const elemIndex = getRandomInt(0, dataArrayCopy.length -1);
      const elem = dataArrayCopy[elemIndex];
      arr.push(elem);
      dataArrayCopy.splice(elemIndex, 1);
    }
    return arr;
  };

  const locationLat = getRandomFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${getAvatarValue()}.png`,
    },
    offer: {
      title: 'Sample text',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInt(100, 1000000),
      type: OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length - 1)],
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 20),
      checkin: CHECKIN_TIME[getRandomInt(0, CHECKIN_TIME.length - 1)],
      checkout: CHECKOUT_TIME[getRandomInt(0, CHECKOUT_TIME.length - 1)],
      features: getRandomArray(FEATURES_LIST),
      description: 'description',
      photos: getRandomArray(PHOTOS_LIST),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

createAvatarValues();
const newArray = Array.from({length: ARRAY_LENGTH}, createArray);
