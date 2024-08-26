import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../components/redux/slices/postSlice';
import PostsBerPage from '../../components/posts/PostsBerPage';

const GetPosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts(''));
    console.log(posts);
  }, [dispatch]);

  return (
    <PostsBerPage title='All posts' />
  );
}

export default GetPosts;
