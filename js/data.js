import { createPopupElement } from './card.js';
import { createOfferMarker } from './map.js';

const OFFERS_COUNT = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features').querySelectorAll('input[type=checkbox]');

const filterPrice = (value, price) => {
  if (value === 'middle' && price >= LOW_PRICE && price <= HIGH_PRICE) {
    return true;
  }
  if (value === 'low' && price < LOW_PRICE) {
    return true;
  }
  if (value === 'high' && price > HIGH_PRICE) {
    return true;
  }
  if (value === 'any') {
    return true;
  }
  return false;
};

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
    .filter((obj) => obj.offer.type === housingType.value || housingType.value === 'any')
    .filter((obj) => filterPrice(housingPrice.value, obj.offer.price))
    .filter((obj) => obj.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any')
    .filter((obj) => obj.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any')
    .sort(compareOffers)
    .slice(0, OFFERS_COUNT)
    .forEach((offer) => {
      createOfferMarker(offer, mapElement, createPopupElement(cardPopup, offer));
    });
};

export { renderOffers, setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures };
