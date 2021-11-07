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

const createPopupElement = (popup, offer) => {
  const offerInfo = offer.offer;
  const card = popup.cloneNode(true);
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

  fillElement(title, offerInfo.title);
  fillElement(textAddress, offerInfo.address);
  fillElement(textPrice, `${offerInfo.price} \u20bd/ночь`);
  fillElement(type, TYPES[offerInfo.type]);
  fillElement(textCapacity, `${offerInfo.rooms} комнаты для ${offerInfo.guests} гостей`);
  fillElement(textTime, `Заезд после ${offerInfo.checkin}, выезд до ${offerInfo.checkout}`);
  fillElement(description, offerInfo.description);

  if (offerInfo.features) {
    createList(features, offerInfo.features, 'popup__feature--');
  }

  if (!offerInfo.features) {
    features.forEach((feature) => {
      feature.remove();
    });
  }

  if (!offerInfo.photos || offerInfo.photos.length === 0) {
    photo.classList.add('hidden');
  }

  if (offerInfo.photos) {
    offerInfo.photos.forEach((offerPhoto, j) => {
      if (j !== 0) {
        photo = photos.children[j-1].cloneNode(true);
        photos.appendChild(photo);
      }
      photo.src = offerPhoto;
    });
  }

  avatar.src = offer.author.avatar;

  return card;
};

export { createPopupElement };
