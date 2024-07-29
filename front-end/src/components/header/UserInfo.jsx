
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

const UserInfo = ({ user }) => {
  const [openDrop, setOpenDrop] = useState(false);
  const userInfoRef = useRef(null);

  const handleClickOutSide = (e) => {
    if (userInfoRef?.current && !userInfoRef.current.contains(e.target)) {
      setOpenDrop(false)
    }
  }

  const handleClick = () => {
    setOpenDrop(prev => !prev);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  }, []);

  return ( 
    <div onClick={ handleClick } ref={ userInfoRef } className="user-info cursor-pointer relative flex items-center gap-[10px] md:gap-[14px]">
      <span className="text-[14px] md:text-[16px] text-black">Hey, { user?.username.split(' ')[0] }</span>
      <div className="photo relative w-[40px] h-[40px] flex items-center rounded-full overflow-hidden border-[2px] border-solid border-gray">
        <img loading='lazy' className="w-full h-full object-cover object-center" src={ user?.profilePhoto?.url } alt="avatar" />
      </div>

      <Dropdown open = { openDrop } />
    </div>
  );
}

export default UserInfo;