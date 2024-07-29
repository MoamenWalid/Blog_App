import React, { useEffect } from 'react';
import EditProfile from './EditProfile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowBrotherProfile from './ShowBrotherProfile';
import { getUser } from '../../components/redux/slices/profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div>
      { id && user && id === user._id 
      ? <EditProfile id={ id } user={ user } profile={ profile } /> 
      : <ShowBrotherProfile profile={ profile } /> }
    </div>
  );
}

export default Profile;
