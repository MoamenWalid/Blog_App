import { Link } from "react-router-dom";

const LoginSignBtn = () => {
  return ( 
    <div className="flex flex-row gap-4">
      <Link to='/login' className="login rounded-md border border-solid border-gray py-1 px-[10px] text-dark">Login</Link>
      <Link to='/sign-up' className="sign-up rounded-md border border-solid border-gray py-1 px-[10px] text-dark">Sign up</Link>
    </div>
  );
}

export default LoginSignBtn;