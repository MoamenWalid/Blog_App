import { Link } from 'react-router-dom';
import './form.scss';
import { useState } from 'react';

const Form = ({ status }) => {
  const [hideShowOne, setHideShowOne] = useState(true);
  const [hideShowTwo, setHideShowTwo] = useState(true);

  return (
    <div className='form-login-signup w-full flex items-start justify-center mt-6'>
      <div className="form-div py-[40px] md:py-[55px] px-[40px] rounded-[24px] w-[90%] sm:w-[450px] bg-[#ffffff9e] border border-[#EEE]">
        <h1 className='text-black font-medium text-[32px] mb-[32px]'>{ status ? "Create an account" : "Login" }</h1>
        <form action="">
          { status && 
            <div className="username w-full mb-[32px] flex flex-col gap-2">
              <label className='text-dark text-[16px]' htmlFor='userName'>Username</label>
              <input autocomplete='off' type="text" id='userName' />
            </div>
          }

          <div className="email w-full mb-[32px] flex flex-col gap-2">
            <label className='text-dark text-[16px]' htmlFor='email'>Email or phone number</label>
            <input autocomplete='off' type="text" id='email' />
          </div>

          <div className="password w-full mb-[32px] flex flex-col gap-2">
            <div className="pasword-hide flex flex-row items-center justify-between">
              <label className='text-dark text-[16px]' htmlFor='password'>Password</label>
              <div onClick={() => setHideShowOne(prev => !prev)} className="hide cursor-pointer text-dark">
              <i class={ hideShowOne ? "bi bi-eye" : "bi bi-eye-slash" }></i>
                <button className='ml-[5px]' type='button'>{ hideShowOne ? "Show" : "Hide" }</button>
              </div>
            </div>
            <input autocomplete='off' type={ hideShowOne ? "password" : "text" } id='password' />
          </div>

          { status && 
            <div className="password w-full mb-[32px] flex flex-col gap-2">
              <div className="pasword-hide flex flex-row items-center justify-between">
                <label className='text-dark text-[16px]' htmlFor='confirm-password'>Confirm password</label>
                <div onClick={() => setHideShowTwo(prev => !prev)} className="hide cursor-pointer text-dark">
                <i class={ hideShowTwo ? "bi bi-eye" : "bi bi-eye-slash" }></i>
                  <button type='button'>{ hideShowTwo ? "Show" : "Hide" }</button>
                </div>
              </div>
              <input autocomplete='off' type={ hideShowTwo ? "password" : "text" } id='confirm-password' />
            </div>
          }

          <button className='form-btn w-full border border-solid border-gray py-[10px] rounded-[32px] mb-[32px]'>{ status ? "Create an account" : "Login" }</button>
          { !status && <button type='button' className='forget-password text-[#F44336] text-[17px] mb-4'>Forget password</button> }
          <p className='text-dark'>
            { !status ? "Don't have an acount?" : "You have an account" } <Link to={ !status ? '/sign-up' : '/login' } className='ml-1 text-[#F44336] text-[17px] underline'>{ !status ? "Sign up" : "Login" }</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Form;
