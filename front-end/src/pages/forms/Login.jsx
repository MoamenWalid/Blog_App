import React from 'react';

const Login = () => {
  return (
    <div className='login w-full mt-[112px] flex items-center justify-center'>
      <div className="login-div w-[90%] md:w-[539px] bg-white">
        <h1 className='text-dark font-medium text-[32px]'>Login</h1>
        <form action="">
          <div className="email w-full">
            <label className='text-gray text-[16px]' htmlFor='email'>Enter your email</label>
            <input type="text" id='email' />
          </div>

          <div className="password w-full">
            <div className="pasword-hide">
              <label className='text-gray text-[16px]' htmlFor='password'>Enter your email</label>
              <div className="hide">
              <i class="bi bi-eye"></i> {/* bi bi-eye-slash */}
                <span>password</span>
              </div>
            </div>
            <input type="text" id='password' />
          </div>

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
