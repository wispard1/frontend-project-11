import { proxy } from 'valtio/vanilla';

const createState = () => {
  const state = proxy({
    form: {
      validationErrors: [],
    },
    fields: {
      rssLink: '',
    },
  });

  return state;
};

export default createState;
