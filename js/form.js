const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const adRoomNumber = adForm.querySelector('#room_number');
const adCapacity = adForm.querySelector('#capacity');

const toggleFormState = (form, inactiveClass) => {
  form.classList.toggle(inactiveClass);
  const elements = form.children;
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

const setCapacityMessage = (rooms, capacity) => {
  if (rooms === '1' && capacity !== '1') {
    return 'Жильё с одной комнатой доступно только для одного гостя';
  }
  if (rooms === '2' && !(capacity === '1' || capacity === '2')) {
    return 'Жильё с двумя комнатами доступно для одного или двух гостей';
  }
  if (rooms === '3' && !(capacity === '1' || capacity === '2' || capacity === '3')) {
    return 'Жильё с тремя комнатами доступно для одного, двух или трёх гостей';
  }
  if (rooms === '100' && capacity !== '0') {
    return 'Жильё со 100 комнатами доступно не для гостей';
  }
  return '';
};

const isCapacity = (rooms, capacity) => {
  if (rooms === '1' && capacity === '1') {
    return true;
  }
  if (rooms === '2' && (capacity === '1' || capacity === '2')) {
    return true;
  }
  if (rooms === '3' && (capacity === '1' || capacity === '2' || capacity === '3')) {
    return true;
  }
  if (rooms === '100' && capacity === '0') {
    return true;
  }
  return false;
};

adTitle.addEventListener('input', () => {
  const MIN_LINGTH = Number(adTitle.attributes.minlength.value);
  const MAX_LINGTH = Number(adTitle.attributes.maxlength.value);
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_LINGTH) {
    adTitle.setCustomValidity(`Ещё ${ MIN_LINGTH - valueLength } символов`);
  } else if (valueLength > MAX_LINGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${ valueLength - MAX_LINGTH } символов`);
  } else {
    adTitle.setCustomValidity('');
  }
});

adType.addEventListener('input', () => {
  adPrice.min = setMinPrice(adType.value);
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

adCapacity.addEventListener('input', () => {
  adCapacity.setCustomValidity(setCapacityMessage(adRoomNumber.value, adCapacity.value));
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!isCapacity(adRoomNumber.value, adCapacity.value)) {
    adCapacity.setCustomValidity(setCapacityMessage(adRoomNumber.value, adCapacity.value));
  }
  if (isCapacity(adRoomNumber.value, adCapacity.value)) {
    adForm.submit();
  }
});

export { toggleFormState };
