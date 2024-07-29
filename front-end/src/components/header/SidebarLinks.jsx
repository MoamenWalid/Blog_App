import NavLinks from "./NavLinks";

const SidebarLinks = ({ toggle, reverseToggle }) => {
  return ( 
    <div style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="side-bar md:hidden z-[3] fixed duration-300 top-0 right-0 w-[75vw] sm:w-[50vw] h-[100vh] bg-white-gray">
      <div onClick={ reverseToggle } className="close absolute top-5 left-5 bg-[#e22828] text-[#FFF] w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-full">
        <i className="bi bi-x-lg"></i>
      </div>
      <NavLinks reverseToggle={ reverseToggle } ulStyle={ `mt-7 flex flex-col items-end` } liStyle={ `w-fit text-[25px] font-normal py-5 px-6` } />
    </div>
  );
}

export default SidebarLinks;