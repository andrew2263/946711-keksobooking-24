import {createOffer, ARRAY_LENGTH} from './data.js';

const offers = Array.from({length: ARRAY_LENGTH}, createOffer);
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const fillElement = (element, data) => {
  if (!data || !data.length) {
    element.classList.add('hidden');
  }
  element.textContent = data;
};

const createList = (listItems, datalist, classNameTemplate) => {
  listItems.forEach((listItem) => {
    const isNecessary = datalist.some(
      (dataItem) => listItem.classList.contains(`${classNameTemplate}${dataItem}`),
    );
    if (!isNecessary) {
      listItem.remove();
    }
  });
};

const cards = [];

for (let i = 0; i < offers.length; i++) {
  const card = cardPopup.cloneNode(true);
  const title = card.querySelector('.popup__title');
  const textAddress = card.querySelector('.popup__text--address');
  const textPrice = card.querySelector('.popup__text--price');
  const type = card.querySelector('.popup__type');
  const textCapacity = card.querySelector('.popup__text--capacity');
  const textTime = card.querySelector('.popup__text--time');
  const features = card.querySelectorAll('.popup__feature');
  const description = card.querySelector('.popup__description');
  const photos = card.querySelector('.popup__photos');
  let photo = card.querySelector('.popup__photo');
  const avatar = card.querySelector('.popup__avatar');

  const offer = offers[i].offer;

  fillElement(title, offer.title);
  fillElement(textAddress, offer.address);
  fillElement(textPrice, `${offer.price} \u20bd/ночь`);
  fillElement(type, TYPES[offer.type]);
  fillElement(textCapacity, `${offer.rooms} комнаты для ${offer.guests} гостей`);
  fillElement(textTime, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillElement(description, offer.description);

  createList(features, offer.features, 'popup__feature--');

  if (offer.photos.length === 0) {
    photo.classList.add('hidden');
  }
  for (let j = 0; j < offer.photos.length; j++) {
    if (j !== 0) {
      photo = photos.children[j-1].cloneNode(true);
      photos.appendChild(photo);
    }
    photo.src = offer.photos[j];
  }
  avatar.src = offers[i].author.avatar;

  cards.push(card);
}

mapCanvas.appendChild(cards[5]);
