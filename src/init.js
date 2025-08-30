import createState from './state.js';
import initView from './view.js';
import validate from './validate.js';
import i18next from 'i18next';
import resources from './locales/ru.json';
import applyTranslations from './applyTranslation.js';
import parserRSS from './parserRSS.js';
import axios from 'axios';
import addProxy from './addProxy.js';

export default () => {
  const i18nextInstance = i18next.createInstance();
  return i18nextInstance
    .init({
      lng: 'ru',
      resources: {
        ru: {
          translation: resources,
        },
      },
    })
    .then(() => {
      const state = createState();
      initView(state, i18nextInstance);

      const elements = document.querySelectorAll('[data-i18n]');
      applyTranslations(elements, i18nextInstance);

      const input = document.getElementById('url-input');
      const form = document.querySelector('.rss-form');

      input.addEventListener('input', (e) => {
        if (state.loadingProcess.state === 'success') {
          state.loadingProcess.state = 'filling';
        }
        state.fields.rssLink = e.target.value;
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rssLink = state.fields.rssLink;

        if (state.refreshTimeout) {
          clearTimeout(state.refreshTimeout);
          state.refreshTimeout = null;
        }

        if (state.currentUrl === rssLink) {
          state.form.validationErrors = {
            rssLink: 'errors.rssAlreadyExists',
          };
          return;
        }
        state.form.validationErrors = validate({ rssLink });
        if (Object.keys(state.form.validationErrors).length > 0) {
          return;
        }

        state.loadingProcess.state = 'loading';

        const proxyUrl = addProxy(rssLink);

        const loadRSS = () => {
          console.log('🔄 Проверка обновлений...');
          axios
            .get(proxyUrl)
            .then((responce) => {
              console.log('✅ Данные получены, парсим...');
              const xmlString = responce.data.contents;

              let parsed;
              try {
                parsed = parserRSS(xmlString);
              } catch (error) {
                console.log('Ошибка парсинга RSS:', error);
                state.loadingProcess.state = 'failed';
                state.form.validationErrors = {
                  rssLink: 'errors.invalidRSS',
                };
                return;
              }
              const { feed, posts } = parsed

              let counter = 0;
              const generateId = () => `${Date.now()}-${counter++}`;

              const existingFeed = Object.values(state.feeds).find((f) => f.title === feed.title);
              const feedId = existingFeed ? existingFeed.id : generateId();

              if (!existingFeed) {
                state.feeds[feedId] = {
                  id: feedId,
                  title: feed.title,
                  description: feed.description,
                };
                console.log('Generated feedId:', feedId);
              }

              posts.forEach((post) => {
                const exist = Object.values(state.posts).some((p) => p.link === post.link);

                if (!exist) {
                  const postId = generateId();
                  state.posts[postId] = {
                    id: postId,
                    title: post.title,
                    link: post.link,
                    description: post.description,
                  };
                  console.log('Generated postId:', postId);
                }
              });

              state.fields.rssLink = '';
              input.value = '';
              state.currentUrl = rssLink;
              state.loadingProcess.state = 'success';

              setTimeout(() => {
                loadRSS();
              }, 5000);
            })
            .catch((err) => {
              console.error('Ошибка загрузки', err);
              state.loadingProcess.state = 'failed';

              if (err.message.includes('Network Error') || err.code === 'ERR_NETWORK') {
                state.form.validationErrors = {
                  rssLink: 'errors.networkError'
                }
              } else {
                state.form.validationErrors = {
                  rssLink: 'errors.invalidRSS'
                }
              }

              setTimeout(() => {
                loadRSS();
              }, 5000);
            });
        };

        loadRSS();
      });
    });
};
