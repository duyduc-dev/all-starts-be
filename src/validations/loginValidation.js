import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().min(6).required(),
});

export default loginSchema;
