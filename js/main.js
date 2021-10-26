import { createPopupElement } from './card.js';
import { createOffer, ARRAY_LENGTH } from './data.js';

const offers = Array.from({length: ARRAY_LENGTH}, createOffer);
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(createPopupElement(cardPopup, offers[0]));
