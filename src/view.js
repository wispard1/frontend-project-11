import { subscribe, snapshot } from 'valtio/vanilla';
import createViewButton from './createViewButton';

const initView = (state, i18nextInstance) => {
  let errorElement = null;
  const render = () => {
    const obj = snapshot(state);
    const { validationErrors, isValid } = obj.form;
    const { rssLink } = obj.fields;
    const { loadingProcess: processState, feeds, posts } = obj;

    const button = document.querySelector('[data-i18n="form.button"]');

    switch (processState.state) {
      case 'loading':
        button.disabled = true;
        button.textContent = 'Загрузка...';
        break;
      case 'filling':
      case 'success':
      case 'failed':
      default:
        button.disabled = false;
        button.textContent = i18nextInstance.t('form.button');
        break;
    }

    const input = document.getElementById('url-input');
    input.value = rssLink;

    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }

    const exampleURL = document.getElementById('example-url');

    const errorMessages = Object.values(validationErrors);

    if (errorMessages.length > 0) {
      errorElement = document.createElement('p');
      errorElement.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');

      errorElement.textContent = i18nextInstance.t(errorMessages[0]);
      exampleURL.appendChild(errorElement);

      input.classList.add('is-invalid');
    } else if (processState.state === 'success') {
      errorElement = document.createElement('p');
      errorElement.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');

      errorElement.textContent = i18nextInstance.t('form.success');
      exampleURL.appendChild(errorElement);
      input.classList.remove('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }

    const appContainer = document.querySelector('main');

    const oldSection = document.querySelector('.container-xxl');
    if (oldSection) {
      oldSection.remove();
    }

    const hasPosts = Object.keys(obj.posts).length > 0;
    const hasFeeds = Object.keys(obj.feeds).length > 0;

    if (hasFeeds || hasPosts) {
      const layoutSection = document.createElement('section');
      layoutSection.className = 'container-fluid container-xxl p-5';

      layoutSection.innerHTML = `
    <div class="row">
      <div class="col-md-10 col-lg-8 mx-auto order-1 order-lg-0 posts">
        <div class="card border-0">
          <div class="card-body"><h2 class="card-title h4">Посты</h2></div>
          <ul class="list-group border-0 rounded-0"></ul>
        </div>
      </div>

      <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
        <div class="card border-0">
          <div class="card-body"><h2 class="card-title h4">Фиды</h2></div>
          <ul class="list-group border-0 rounded-0"></ul>
        </div>
      </div>
    </div>
  `;

      appContainer.appendChild(layoutSection);

      const feedsContainer = document.querySelector('.feeds .list-group');
      const postsContainer = document.querySelector('.posts .list-group');

      feedsContainer.innerHTML = '';
      postsContainer.innerHTML = '';

      Object.values(obj.feeds).forEach((feed) => {
        const feedItem = document.createElement('li');
        feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');

        const title = document.createElement('h3');
        title.classList.add('h6', 'm-0');
        title.textContent = feed.title;

        const description = document.createElement('p');
        description.classList.add('m-0', 'small', 'text-black-50');
        description.textContent = feed.description;

        feedItem.appendChild(title);
        feedItem.appendChild(description);
        feedsContainer.appendChild(feedItem);
      });

      Object.values(obj.posts).forEach((post) => {
        const postItem = document.createElement('li');
        postItem.classList.add(
          'list-group-item',
          'd-flex',
          'justify-content-between',
          'align-items-start',
          'border-0',
          'border-end-0'
        );

        const link = document.createElement('a');
        link.href = post.link;
        link.classList.add(post.read ? 'fw-normal' : 'fw-bold');
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = post.title;

        if (post.read) {
          link.classList.add('fw-normal');
        } else {
          link.classList.add('fw-bold');
        }

        postItem.appendChild(link);
        postItem.appendChild(
          createViewButton(state, post.id, {
            title: post.title,
            description: post.description
          })
        );
        postsContainer.appendChild(postItem);
      });
    }
  };
  subscribe(state, render);

  render();
};
export default initView;
