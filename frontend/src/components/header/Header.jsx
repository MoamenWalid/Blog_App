import React, { useState } from "react";
import LoginSignBtn from "./LoginSignBtn";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import "./header.scss";
import SidebarLinks from "./SidebarLinks";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

const Header = React.memo(() => {
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector(state => state.auth);

  const reverseToggle = () => {
    const overlayout = document.querySelector('div.overlayout');
    setToggle(prev => !prev);
    toggle ? overlayout.classList.replace('block', 'hidden') : overlayout.classList.replace('hidden', 'block');
  }

  return (
    <header className="header flex justify-center items-center backdrop-blur-[6px] py-3 sticky top-0 left-0 w-full z-[2] h-[60px]">
      <div className="w-full mx-4 md:mx-10 flex flex-row items-center justify-between">
        <Logo />
        <NavLinks navStyle={ `hidden  md:block` } ulStyle={ `flex flex-row gap-[25px] lg:gap-[40px]` } liStyle={ `text-[17px]` } />
        <div className="flex flex-row items-center justify-center gap-3">
          { user ? <UserInfo user={ user } /> : <LoginSignBtn /> }
          <button onClick={ reverseToggle } className="menu block md:hidden">
            <i className="bi bi-list text-[22px]"></i>
          </button>
        </div>
        <SidebarLinks toggle={ toggle } reverseToggle={ reverseToggle } />
      </div>
    </header>
  );
})

export default Header;