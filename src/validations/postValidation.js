import * as Yup from 'yup';

const PostValidationSchema = Yup.object().shape({
  content: Yup.string().optional(),
  backgroundColor: Yup.string().optional(),
  image: Yup.string().optional(),
});

export default PostValidationSchema;
