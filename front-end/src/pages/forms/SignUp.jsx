import { useFormik } from "formik";
import Form from "./Form.jsx";
import { signUpSchema } from "./schema.js";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: (values, formikHelper) => {
      if (values.password !== values.confirmPassword) {
        formikHelper.setFieldError('confirmPassword', 'Must confirm password');
      }
    },
  });

  return (
    <Form status="true" formik={ formik } />
  );
}

export default SignUp;
