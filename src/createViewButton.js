const createViewButton = (state, postId, { title, description }) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.textContent = 'Просмотр';

  button.addEventListener('click', () => {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.querySelector('#modal .card-text');

    modalTitle.textContent = title;
    modalBody.textContent = description;

    state.posts[postId].read = true;
  });

  return button;
};

export default createViewButton;
