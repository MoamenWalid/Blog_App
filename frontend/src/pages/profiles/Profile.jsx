import React, { useEffect } from 'react';
import EditProfile from './EditProfile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowBrotherProfile from './ShowBrotherProfile';
import { getUser } from '../../components/redux/slices/profileSlice';
import PostsInProfile from './PostsInProfile';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div className='container mx-auto mt-[30px] mb-[56px] md:mb-[90px]'>
      <h1 className="text-[#181A2A] m-[20px] font-bold text-[25px]">Profile Page</h1>
      { id && user && id === user._id 
      ? <EditProfile id={ id } user={ user } profile={ profile } /> 
      : <ShowBrotherProfile profile={ profile } /> }
      <PostsInProfile username={ profile?.username } posts={ profile?.posts } />
    </div>
  );
}

export default Profile;
