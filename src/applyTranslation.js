export default (elements, i18nextInstance) => {
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const translate = i18nextInstance.t(key);
    element.textContent = translate;
  });
};
