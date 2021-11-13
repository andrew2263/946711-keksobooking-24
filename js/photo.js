import { adForm } from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarInput = adForm.querySelector('#avatar');
const avatar = adForm.querySelector('.ad-form-header__preview').querySelector('img');
const offerPhotoInput = adForm.querySelector('.ad-form__upload').querySelector('input[type=file]');
const offerPhotoBlock = adForm.querySelector('.ad-form__photo');
const offerPhoto = document.createElement('img');
offerPhoto.width = '70';
offerPhoto.height = '70';

const addPhoto = (fileInput, photoElement) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    photoElement.src = URL.createObjectURL(file);
  }
};

avatarInput.addEventListener('change', () => {
  addPhoto(avatarInput, avatar);
});

offerPhotoInput.addEventListener('change', () => {
  addPhoto(offerPhotoInput, offerPhoto);
  offerPhotoBlock.appendChild(offerPhoto);
});

adForm.addEventListener('reset', () => {
  avatar.src = '../img/muffin-grey.svg';
  offerPhotoBlock.innerHTML = '';
});
