import { useFormik } from "formik";
import Form from "./Form.jsx";
import { signUpSchema } from "./schema.js";
import { useDispatch, useSelector } from "react-redux";
import { clearSignUpMessage, signUpUser } from "../../components/redux/slices/authSlice.js";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const navigate = useNavigate();
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

      else dispatch(signUpUser(values));
    },
  });

  if (signUpMessage) {
    Swal.fire({
      title: signUpMessage,
      icon: "success",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
        dispatch(clearSignUpMessage());
      }
    });
  }

  return (
    <Form status="true" formik={ formik } />
  );
}

export default SignUp;
