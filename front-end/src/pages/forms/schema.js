import * as Yup from 'yup';

const signUpSchema =  Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').max(100).required('Required'),
  password: Yup.string().required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least 1 number'),
  confirmPassword: Yup.string().required('Required')
})

const logInSchema =  Yup.object().shape({
  email: Yup.string().email('Invalid email').max(100).required('Required'),
  password: Yup.string().required('Required')
})

const editProfileSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
  email: Yup.string().email('Invalid email').max(100),
  bio: Yup.string().min(2),
  oldPassword: Yup.string(),
  newPassword: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least 1 number'),
})

export { signUpSchema, logInSchema, editProfileSchema }