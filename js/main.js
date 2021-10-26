import { createPopupElement } from './card.js';
import { createOffer, ARRAY_LENGTH } from './data.js';
import { toInactiveForm, toActiveForm } from './form.js';

const offers = Array.from({length: ARRAY_LENGTH}, createOffer);
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

mapCanvas.appendChild(createPopupElement(cardPopup, offers[0]));

toInactiveForm(adForm, 'ad-form--disabled');
toInactiveForm(mapFilters, 'map__filters--disabled');
toActiveForm(mapFilters, 'map__filters--disabled');
