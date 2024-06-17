import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className="logo w-[130px] md:w-[158px]">
      <img src="/imgs/logoLight.svg" alt="logo" />
    </Link>
  );  
};

export default Logo;
