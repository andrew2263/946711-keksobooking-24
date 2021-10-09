import { getRandomInt, getRandomFloat } from './util.js';

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
    const value = getRandomInt(1, ARRAY_LENGTH);
    return (value < 10) ? `0${value}` : `${value}`;
  };

  const getShuffledItems = (items) => {
    const itemsCopy = items.slice().sort(() => 0.5 - Math.random());
    return itemsCopy;
  };

  const getRandomItems = (items) => {
    const randomIndex = getRandomInt(0, items.length);
    return getShuffledItems(items).slice(0, randomIndex);
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
      features: getRandomItems(FEATURES_LIST),
      description: 'description',
      photos: getRandomItems(PHOTOS_LIST),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

export { ARRAY_LENGTH, createOffer };
