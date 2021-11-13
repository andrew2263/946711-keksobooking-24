import { sendData } from './api.js';
import { isEscapeKey } from './util.js';

const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const adRoomNumber = adForm.querySelector('#room_number');
const adCapacity = adForm.querySelector('#capacity');
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');

const toggleFormState = (form, inactiveClass) => {
  form.classList.toggle(inactiveClass);
  const elements = form.elements;
  for (const element of elements) {
    if (element.disabled) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }
};

const setMinPrice = (type) => {
  switch (type) {
    case 'bungalow': {
      return '0';
    }
    case 'flat': {
      return '1000';
    }
    case 'hotel': {
      return '3000';
    }
    case 'house': {
      return '5000';
    }
    case 'palace': {
      return '10000';
    }
    default: {
      return '0';
    }
  }
};

const roomsToCapacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onRoomsChange = () => {
  const roomNumber = adRoomNumber.value;
  const capacityNumber = Number(adCapacity.value);
  adCapacity.setCustomValidity(roomsToCapacities[roomNumber].includes(capacityNumber) ? '' : 'Количество гостей больше, чем комнат');
};

adTitle.addEventListener('input', () => {
  const minLength = Number(adTitle.attributes.minlength.value);
  const maxLength = Number(adTitle.attributes.maxlength.value);
  const valueLength = adTitle.value.length;

  if (valueLength < minLength) {
    adTitle.setCustomValidity(`Ещё ${ minLength - valueLength } символов`);
  } else if (valueLength > maxLength) {
    adTitle.setCustomValidity(`Удалите лишние ${ valueLength - maxLength } символов`);
  } else {
    adTitle.setCustomValidity('');
  }
});

adType.addEventListener('input', () => {
  adPrice.min = setMinPrice(adType.value);
  adPrice.placeholder = setMinPrice(adType.value);
});

adPrice.addEventListener('input', () => {
  adPrice.min = setMinPrice(adType.value);
  if (adPrice.value < Number(adPrice.min)) {
    adPrice.setCustomValidity(`Минимальное значение: ${ adPrice.min }`);
  } else if (adPrice.value > Number(adPrice.max)) {
    adPrice.setCustomValidity(`Максимальное значение: ${ adPrice.max }`);
  } else {
    adPrice.setCustomValidity('');
  }
});

adTimein.addEventListener('input', () => {
  adTimeout.value = adTimein.value;
});

adTimeout.addEventListener('input', () => {
  adTimein.value = adTimeout.value;
});

adCapacity.addEventListener('input', onRoomsChange);

const onMessageEscKeydown = (message) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(message);
  }
};

function showMessage (message) {
  document.body.append(message);
  document.addEventListener('keydown', onMessageEscKeydown(message));
}

function closeMessage (message) {
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown(message));
}

successMessage.addEventListener('click', () => {
  successMessage.remove();
});

errorButton.addEventListener('click', () => {
  errorMessage.remove();
});

errorMessage.addEventListener('click', () => {
  errorMessage.remove();
});

const setAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showMessage(errorMessage),
      new FormData(evt.target),
    );
  });
};

export { adForm, toggleFormState, setAdFormSubmit, showMessage, successMessage };
