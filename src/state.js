import { proxy } from 'valtio/vanilla';

const createState = () => {
  const state = proxy({
    form: {
      isValid: true,
      validationErrors: [],
    },
    loadingProcess: {
      state: 'filling',
    },
    fields: {
      rssLink: '',
    },
    feeds: {},
    posts: {},
    currentUrl: null,
    refreshTimeout: null,
  });

  return state;
};

export default createState;
