import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfMember, deleteMember, getAllUsers } from '../../components/redux/slices/userSlice';
import { Link } from 'react-router-dom';
import './style.scss';
import { ToastContainer } from 'react-toastify';

const GetMembers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleStatusOfMember = (id, status) => {
    dispatch(changeStatusOfMember({ id,  status }));
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteMember(id));
  }

  return (
    <>
      <ToastContainer position='top-center' />
      <div className='members w-[800px] mx-auto mt-[30px] md:mt-[50px] [border:1px_solid_#DDD] rounded-[10px] mb-[56px] md:mb-[90px]'>
        { users.length ? users.map(member => (
          <div key={ member?._id } className="member flex items-center justify-between flex-wrap py-[15px] px-[20px] ">
            <Link to={`/profile/${member?._id}`} className="author w-fit flex items-center flex-row gap-4">
              <div className="avatar w-[36px] h-[36px] rounded-full overflow-hidden">
                <img loading='lazy' className='w-full h-full object-cover object-[center_top]' src={member?.profilePhoto?.url} alt="avatar" />
              </div>
              <span className="name block text-[16px] font-medium text-[#97989F]">
                {member?.username}
              </span>
              <p className="email text-[16px] text-[#97989F]">
                { member?.email }
              </p>
            </Link>
  
            <div className="change-status flex items-center gap-4">
              <button onClick={() => handleStatusOfMember(member?._id, true)} type='button' className='style-admin same-style'>Admin</button>
              <button onClick={() => handleStatusOfMember(member?._id, false)} type='button' className='style-member same-style'>Member</button>
              <button onClick={() => handleDeleteUser(member?._id)}  type='button' className="delete-member">
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        )) : null }
      </div>
    </>
  );
}

export default GetMembers;
