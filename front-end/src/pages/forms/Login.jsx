import { useFormik } from 'formik';
import Form from "./Form.jsx";
import { logInSchema } from './schema.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../components/redux/slices/authSlice.js';

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: logInSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });

  return (
    <Form formik={ formik } />
  );
}

export default Login;
