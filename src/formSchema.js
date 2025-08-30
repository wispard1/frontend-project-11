import * as yup from 'yup';

const formSchema = yup.object({
  rssLink: yup.string().url('errors.invalidURL'),
});

export default formSchema;
