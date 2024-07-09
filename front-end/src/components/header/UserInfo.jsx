
const UserInfo = ({ user }) => {
  return ( 
    <div className="flex items-center gap-[10px] md:gap-[14px]">
      <span className="text-[14px] md:text-[16px] text-black">Hey, { user?.username }</span>
      <div className="photo w-[40px] md:w-[54px] h-[40px] md:h-[54px] flex items-center rounded-full overflow-hidden border-[2px] border-solid border-gray">
        <img className="w-full h-full" src={ user?.profilePhoto.url } alt="avatar" />
      </div>
    </div>
  );
}

export default UserInfo;