import { useFormik } from "formik";
import Form from "./Form.jsx";
import { signUpSchema } from "./schema.js";
import { useDispatch, useSelector } from "react-redux";
import { clearSignUpMessage, signUpUser } from "../../components/redux/slices/authSlice.js";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const navigator = useNavigate();
  const { signUpMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
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
      dispatch(signUpUser(values));
    },
  });

  if (signUpMessage) {
    swal({
      title: signUpMessage,
      icon: "success"
    }).then(isOk => {
      if(isOk) {
        navigator('/login');
        dispatch(clearSignUpMessage());
      }
    })
  }

  return (
    <Form status="true" formik={ formik } />
  );
}

export default SignUp;
