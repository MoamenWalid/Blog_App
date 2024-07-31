import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfMember, deleteMember, getAllUsers } from '../../components/redux/slices/userSlice';
import { Link } from 'react-router-dom';
import './style.scss';
import { ToastContainer } from 'react-toastify';
import Spinner from '../../components/animation/Spinner';

const GetMembers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleStatusOfMember = (id, status) => {
    dispatch(changeStatusOfMember({ id, status }));
  }

  return (
    <>
      <ToastContainer position='top-center' />
      { loading ? 
        <div className='w-full h-screen bg-white fixed top-[60px] z-30'>
          <Spinner />
        </div>
      : null }

      <h1 className="w-[350px] sm:w-[450px] md:w-[600px] lg:w-[800px] mx-auto mt-[30px] text-[#181A2A] font-bold text-[25px]">Members</h1>
      <div className='members w-[350px] sm:w-[450px] md:w-[600px] lg:w-[800px] mx-auto mt-[25px] [border:1px_solid_#DDD] rounded-[10px] mb-[56px] md:mb-[90px]'>
        { users.length ? users.map(member => (
          user?._id !== member?._id ?
          <div key={ member?._id } className="member flex gap-5 items-center md:justify-between flex-wrap py-[15px] px-[20px] ">
            <Link to={`/profile/${member?._id}`} className="author w-full md:w-fit flex items-center flex-row gap-4">
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
              { member?.isAdmin
              ? <button onClick={() => handleStatusOfMember(member?._id, false)} type='button' className='style-member same-style'>Member</button>
              : <button onClick={() => handleStatusOfMember(member?._id, true)} type='button' className='style-admin same-style'>Admin</button>  } 
            </div>
          </div> : null
        )) : null }
      </div>
    </>
  );
}

export default GetMembers;
