import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../components/redux/slices/profileSlice';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id])

  return (
    <div className='profile mx-auto my-[56px] md:my-[90px] flex flex-col gap-3 items-center py-[40px] md:py-[55px] px-[40px] rounded-[24px] w-[90%] sm:w-[390px] bg-[#ffffff9e] border border-[#EEE]'>
      <div className="photo relative w-[100px] md:w-[150px] h-[100px] md:h-[150px] flex items-center rounded-full border-[2px] md:border-[4px] border-solid border-gray">
        <div className='overflow-hidden w-full h-full rounded-full'>
          <img className="w-full h-full object-cover" src={ profile?.profilePhoto.url } alt="avatar" />
        </div>
        <div className="upload-img cursor-pointer border-gray border-[2px] absolute bottom-0 right-0 text-[20px] md:text-[26px] bg-white w-[29px] md:w-[37px] h-[29px] md:h-[37px] flex items-center justify-center rounded-full">
          <i className="bi bi-camera"></i>
        </div>
      </div>

      <div className="username">{ profile?.username }</div>
      <div className="bio max-w-[300px] text-center">{profile?.bio}</div>
    </div>
  );
}

export default Profile;