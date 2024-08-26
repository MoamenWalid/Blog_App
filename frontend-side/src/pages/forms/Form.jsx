import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Form = ({ status, formik }) => {
  const [hideShowOne, setHideShowOne] = useState(true);
  const [hideShowTwo, setHideShowTwo] = useState(true);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="form-parent">
        <div className="form-div">
          <h1 className="text-black font-medium text-[32px] mb-[32px]">
            {status ? "Create an account" : "Login"}
          </h1>
          <form onSubmit={formik.handleSubmit} action="">
            {status && (
              <div className="username w-full mb-[32px] flex flex-col gap-2">
                <label className="text-dark text-[16px]" htmlFor="userName">
                  Username
                </label>
                <input
                  name="username"
                  autoComplete="off"
                  type="text"
                  id="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                <span className="error">
                { formik.touched.username && formik.errors.username ? formik.errors.username : null }
                </span>
              </div>
            )}
      
            <div className="email w-full mb-[32px] flex flex-col gap-2">
              <label className="text-dark text-[16px]" htmlFor="email">
                Email or phone number
              </label>
              <input
                name="email"
                autoComplete="off"
                type="text"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <span className="error">
                { formik.touched.email && formik.errors.email ? formik.errors.email : null }
              </span>
            </div>
      
            <div className="password w-full mb-[32px] flex flex-col gap-2">
              <div className="pasword-hide flex flex-row items-center justify-between">
                <label className="text-dark text-[16px]" htmlFor="password">
                  Password
                </label>
                <div
                  onClick={() => setHideShowOne((prev) => !prev)}
                  className="hide cursor-pointer text-dark"
                >
                  <i className={hideShowOne ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                  <button className="ml-[5px]" type="button">
                    {hideShowOne ? "Show" : "Hide"}
                  </button>
                </div>
              </div>
              <input
                name="password"
                autoComplete="off"
                type={hideShowOne ? "password" : "text"}
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span className="error">
                { formik.touched.password && formik.errors.password ? formik.errors.password : null }
              </span>
            </div>
      
            {status && (
              <div className="password w-full mb-[32px] flex flex-col gap-2">
                <div className="pasword-hide flex flex-row items-center justify-between">
                  <label
                    className="text-dark text-[16px]"
                    htmlFor="confirm-password"
                  >
                    Confirm password
                  </label>
                  <div
                    onClick={() => setHideShowTwo((prev) => !prev)}
                    className="hide cursor-pointer text-dark"
                  >
                    <i className={hideShowTwo ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                    <button type="button">{hideShowTwo ? "Show" : "Hide"}</button>
                  </div>
                </div>
                <input
                  name="confirmPassword"
                  autoComplete="off"
                  type={hideShowTwo ? "password" : "text"}
                  id="confirm-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                <span className="error">
                  { formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null }
                </span>
              </div>
            )}
      
            <button type="submit" className="form-btn">
              {status ? "Create an account" : "Login"}
            </button>
            {!status && (
              <button
                type="button"
                className="forget-password text-[#F44336] text-[17px] mb-4"
              >
                Forget password
              </button>
            )}
            <p className="text-dark">
              {!status ? "Don't have an acount?" : "You have an account"}{" "}
              <Link
                to={!status ? "/sign-up" : "/login"}
                className="ml-1 text-[#F44336] text-[17px] underline"
              >
                {!status ? "Sign up" : "Login"}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
