import { createPopupElement } from './card.js';
import { createOffer, ARRAY_LENGTH } from './data.js';
import { toggleFormState } from './form.js';
import './form.js';

const offers = Array.from({length: ARRAY_LENGTH}, createOffer);
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

mapCanvas.appendChild(createPopupElement(cardPopup, offers[0]));

toggleFormState(adForm, 'ad-form--disabled');
toggleFormState(adForm, 'ad-form--disabled');
toggleFormState(mapFilters, 'map__filters--disabled');
toggleFormState(mapFilters, 'map__filters--disabled');
