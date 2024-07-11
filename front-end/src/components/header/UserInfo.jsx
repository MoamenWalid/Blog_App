import { useState } from "react";
import Dropdown from "./Dropdown";

const UserInfo = ({ user }) => {
  const [openDrop, setOpenDrop] = useState(false);

  return ( 
    <div onClick={() => setOpenDrop(prev => !prev)} className="user-info cursor-pointer relative flex items-center gap-[10px] md:gap-[14px]">
      <span className="text-[14px] md:text-[16px] text-black">Hey, { user?.username }</span>
      <div className="photo w-[40px] h-[40px] flex items-center rounded-full overflow-hidden border-[2px] border-solid border-gray">
        <img className="w-full h-full" src={ user?.profilePhoto?.url } alt="avatar" />
      </div>

      <Dropdown open = { openDrop } />
    </div>
  );
}

export default UserInfo;