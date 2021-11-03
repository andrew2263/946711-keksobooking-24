import { createPopupElement } from './card.js';
import { createOffer, ARRAY_LENGTH } from './data.js';
import { toggleFormState } from './form.js';
import { marker, createOfferMarker } from './map.js';
import './form.js';

const offers = Array.from({length: ARRAY_LENGTH}, createOffer);
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const adForm = document.querySelector('.ad-form');
const adAddress = adForm.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

window.onload = () => {
  toggleFormState(adForm, 'ad-form--disabled');
  toggleFormState(mapFilters, 'map__filters--disabled');
};

const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormState(adForm, 'ad-form--disabled');
    toggleFormState(mapFilters, 'map__filters--disabled');
    adAddress.value = '35.66844, 139.74647';
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

offers.forEach((offer) => {
  createOfferMarker(offer, map, createPopupElement(cardPopup, offer));
});
