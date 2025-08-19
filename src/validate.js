// validate.js
import formSchema from './formSchema.js';
import keyBy from 'lodash/keyBy';

const validate = (fields) => {
  try {
    formSchema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return Object.fromEntries(e.inner.map((error) => [error.path, error.message]));
  }
};

export default validate;

