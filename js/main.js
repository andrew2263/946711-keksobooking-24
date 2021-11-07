import { createPopupElement } from './card.js';
import { createOffer } from './data.js';
import { toggleFormState, setAdFormSubmit, showMessage, successMessage } from './form.js';
import { marker, createOfferMarker } from './map.js';
import './form.js';

const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const adAddress = adForm.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

const renderOffers = (offers, mapElement) => {
  offers.forEach((offer) => {
    createOfferMarker(offer, mapElement, createPopupElement(cardPopup, offer));
  });
};

window.onload = () => {
  toggleFormState(adForm, 'ad-form--disabled');
  toggleFormState(mapFilters, 'map__filters--disabled');
};


const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormState(adForm, 'ad-form--disabled');
    toggleFormState(mapFilters, 'map__filters--disabled');
    adAddress.value = '35.66844, 139.74647';
    createOffer((data) => {
      renderOffers(data, map);
    }, alert);
  })
  .setView({
    lat: 35.6684415,
    lng: 139.7464674,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

marker.addTo(map);

marker.on('moveend', (evt) => {
  adAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const resetMap = () => {
  marker.setLatLng({
    lat: 35.6684415,
    lng: 139.7464674,
  });

  map.setView({
    lat: 35.6684415,
    lng: 139.7464674,
  }, 13);

  map.closePopup();

  adAddress.value = '35.66844, 139.74647';
};

const onSuccess = () => {
  adForm.reset();
  showMessage(successMessage);
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
});

setAdFormSubmit(onSuccess);
