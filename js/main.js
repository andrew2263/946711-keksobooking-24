import { createOffer } from './api.js';
import { adForm, toggleFormState, setAdFormSubmit, showMessage, successMessage } from './form.js';
import { marker } from './map.js';
import { renderOffers, setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures } from './data.js';
import { debounce } from './util.js';
import './photo.js';

const resetButton = adForm.querySelector('.ad-form__reset');
const adAddress = adForm.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

window.onload = () => {
  toggleFormState(adForm, 'ad-form--disabled');
  toggleFormState(mapFilters, 'map__filters--disabled');
};

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

map
  .on('load', () => {
    toggleFormState(adForm, 'ad-form--disabled');
    toggleFormState(mapFilters, 'map__filters--disabled');
    adAddress.value = '35.66844, 139.74647';
    createOffer((data) => {
      renderOffers(data, markerGroup);
      setHousingType(debounce(() => {
        renderOffers(data, markerGroup);
        resetMap();
      }));
      setHousingPrice(debounce(() => {
        renderOffers(data, markerGroup);
        resetMap();
      }));
      setHousingRooms(debounce(() => {
        renderOffers(data, markerGroup);
        resetMap();
      }));
      setHousingGuests(debounce(() => {
        renderOffers(data, markerGroup);
        resetMap();
      }));
      setHousingFeatures(debounce(() => {
        renderOffers(data, markerGroup);
        resetMap();
      }));
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
