import { useState } from "react";
import LoginSignBtn from "./LoginSignBtn";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import "./header.css";
import SidebarLinks from "./SidebarLinks";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const reverseToggle = () => setToggle(prev => !prev);

  return (
    <header className="backdrop:blur-[6px] fixed top-0 left-0 w-full z-[2]">
      <div className="mx-4 md:mx-10 my-5 flex flex-row items-center justify-between">
        <Logo />
        <NavLinks navStyle={ `hidden  md:block` } ulStyle={ `flex flex-row gap-[40px]` } liStyle={ `text-[17px]` } />
        <div className="flex flex-row items-center justify-center gap-5">
          <LoginSignBtn />
          <button onClick={ reverseToggle } className="menu block md:hidden">
            <i className="bi bi-list text-[22px]"></i>
          </button>
        </div>
        <SidebarLinks toggle={ toggle } reverseToggle={ reverseToggle } />
      </div>
    </header>
  );
};

export default Header;
