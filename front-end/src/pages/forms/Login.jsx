import { useFormik } from 'formik';
import Form from "./Form.jsx";
import { logInSchema } from './schema.js';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: logInSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form formik={ formik } />
  );
}

export default Login;
