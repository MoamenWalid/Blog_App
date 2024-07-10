import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Dropdown = ({ open }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div style={{ display: open ? 'block' : 'none' }} className='dropdown absolute top-[100%] right-[25%] md:right-[40%] bg-[#ffffff96] border-[#eeeeeee7] border-[1px] rounded-[6px] p-[7px] md:p-[10px]'>
      <Link to={`/profile/${user?._id}`} className="profile flex flex-row gap-3">
        <i className="bi bi-person"></i>
        <span className='text-black text-[14px] md:text-[15px]'>Profile</span>
      </Link>

      <div onClick={() => dispatch(logout())} className="logout flex flex-row gap-3">
        <i className="bi bi-box-arrow-left"></i>
        <span className='text-black text-[14px] md:text-[15px]'>Logout</span>
      </div>
    </div>
  );
}

export default Dropdown;