import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  email: Yup.string().email('email không hợp lệ').required(),
  password: Yup.string().min(6).required(),
  phone: Yup.number().required(),
  username: Yup.string().required(),
});

export default registerSchema;
