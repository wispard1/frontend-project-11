import { subscribe, snapshot } from 'valtio/vanilla';

const initView = (state) => {
  let errorElement = null;
  const render = () => {
    const obj = snapshot(state);
    const { validationErrors } = obj.form;
    const { rssLink } = obj.fields;

    console.log('🎨 Render вызван. Текущее значение из state:', rssLink);

    const input = document.getElementById('url-input');
    console.log('🎨 input.value ДО обновления:', input.value);

    input.value = rssLink
    console.log('🎨 input.value ПОСЛЕ обновления:', input.value);

    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }

    const textMuted = document.querySelector('.text-muted');

    const errorMessages = Object.values(validationErrors)

    if (errorMessages.length > 0) {
      errorElement = document.createElement('p');
      errorElement.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
      
      errorElement.textContent = errorMessages.join('. ');
      textMuted.appendChild(errorElement);

      input.classList.add('is-invalid')
    } else {
      input.classList.remove('is-invalid');
    }
  };
  subscribe(state, render);

  render();
};
export default initView;

// const validationErrors = validate(errors)
// const errorMessages = Object.values(validationErrors).map(err => err.message)
