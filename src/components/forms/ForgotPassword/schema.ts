import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email().required('Email is a required field'),
  // INJECT
});
