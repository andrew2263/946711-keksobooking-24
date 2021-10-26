const toInactiveForm = (form, inactiveClass) => {
  form.classList.add(inactiveClass);
  const elements = form.children;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

const toActiveForm = (form, inactiveClass) => {
  form.classList.remove(inactiveClass);
  const elements = form.children;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};

export { toInactiveForm, toActiveForm };
