import * as yup from 'yup';

const formSchema = yup.object({
  rssLink: yup
    .string()
    .url('Должен быть валидный URL')
    .required('Строка не должна быть пустой.'),
});

export default formSchema;
