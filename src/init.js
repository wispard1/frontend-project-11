import createState from './state.js';
import initView from './view.js';
import validate from './validate.js';

export default () => {
  const state = createState();
  initView(state);

  const input = document.getElementById('url-input');
  console.log('🔍 input:', input);
  input.addEventListener('input', (e) => {
    console.log('🔧 Input event: пользователь ввёл', e.target.value);
    state.fields.rssLink = e.target.value;
    console.log('✅ State обновлён: rssLink =', state.fields.rssLink);
  });

  const form = document.querySelector('.rss-form');
  console.log('form:', form)

  if (!form) {
  console.error('❌ Форма не найдена! Проверь, существует ли она в DOM.');
}
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssLink = state.fields.rssLink;
    state.form.validationErrors = validate({ rssLink });
    console.log('🔍 Результат валидации:', state.form.validationErrors);
  });
};
