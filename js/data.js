import { createPopupElement } from './card.js';
import { createOfferMarker } from './map.js';

const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const OFFERS_COUNT = 10;

const filterPrice = (value, price) => {
  if (value === 'middle' && price >= 10000 && price <= 50000) {
    return true;
  }
  if (value === 'low' && price < 10000) {
    return true;
  }
  if (value === 'high' && price > 50000) {
    return true;
  }
  if (value === 'any') {
    return true;
  }
  return false;
};

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features').querySelectorAll('input[type=checkbox]');

const setHousingType = (cb) => {
  housingType.addEventListener('change', () => {
    cb();
  });
};

const setHousingPrice = (cb) => {
  housingPrice.addEventListener('change', () => {
    cb();
  });
};

const setHousingRooms = (cb) => {
  housingRooms.addEventListener('change', () => {
    cb();
  });
};

const setHousingGuests = (cb) => {
  housingGuests.addEventListener('change', () => {
    cb();
  });
};

const setHousingFeatures = (cb) => {
  for (const housingFeature of housingFeatures) {
    housingFeature.addEventListener('change', () => {
      cb();
    });
  }
};

const getOfferRank = (obj) => {
  let rank = 0;
  for (const housingFeature of housingFeatures) {
    if (obj.offer.features && housingFeature.checked) {
      obj.offer.features.forEach((feature) => {
        if (feature === housingFeature.value) {
          rank += 1;
        }
      });
    }
  }
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);
  return rankB - rankA;
};

const renderOffers = (offers, mapElement) => {
  mapElement.clearLayers();
  offers
    .filter((obj) => {
      if (obj.offer.type === housingType.value || housingType.value === 'any') {
        return true;
      }
      return false;
    })
    .filter((obj) => {
      if (filterPrice(housingPrice.value, obj.offer.price)) {
        return true;
      }
      return false;
    })
    .filter((obj) => {
      if (obj.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any') {
        return true;
      }
      return false;
    })
    .filter((obj) => {
      if (obj.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any') {
        return true;
      }
      return false;
    })
    .sort(compareOffers)
    .slice(0, OFFERS_COUNT)
    .forEach((offer) => {
      createOfferMarker(offer, mapElement, createPopupElement(cardPopup, offer));
    });
};

export { renderOffers, setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures };
