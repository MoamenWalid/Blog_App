import { useFormik } from 'formik';
import Form from "./Form.jsx";
import { logInSchema } from './schema.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../components/redux/slices/authSlice.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: logInSchema,
    onSubmit: values => {
      dispatch(loginUser(values))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
    })
    },
  });

  return (
    <Form formik={ formik } />
  );
}

export default Login;
