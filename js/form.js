const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const adRoomNumber = adForm.querySelector('#room_number');
const adCapacity = adForm.querySelector('#capacity');
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');

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
  let minPrice = '0';
  switch (type) {
    case 'bungalow':
      minPrice = '0';
      break;
    case 'flat':
      minPrice = '1000';
      break;
    case 'hotel':
      minPrice = '3000';
      break;
    case 'house':
      minPrice = '5000';
      break;
    case 'palace':
      minPrice = '10000';
      break;
    default:
      minPrice = '0';
  }
  return minPrice;
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

adCapacity.addEventListener('input', () => {
  onRoomsChange();
});

export { toggleFormState };
