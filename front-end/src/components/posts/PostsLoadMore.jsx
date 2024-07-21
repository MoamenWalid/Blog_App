import PostCart from './PostCart.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLoadMore, setCurrentPage, getPostsCount } from '../redux/slices/postSlice';

const PostsLoadMore = ({ title }) => {
  const dispatch = useDispatch();
  const { postsLoadMore, currentPage, postsCount, loading } = useSelector(state => state.post);  

  useEffect(() => {
    dispatch(getPostsCount());
  }, [])

  useEffect(() => {
    dispatch(getPostsLoadMore(currentPage));
  }, [dispatch, currentPage])

  return (
    <div className='container mx-auto mt-5 px-3'>
      <h1 className="text-[#181A2A] mb-5 font-bold text-[25px]">{ title }</h1>
      <div className='posts-load-more mb-5  grid gap-4 grid-cols-1 md:grid-cols-3'>
        {postsLoadMore.map((post, index) => (
          <PostCart key={`${post?._id}-${index}-post`} post={post} />
        ))}
      </div>
      
      { currentPage < Math.ceil(postsCount / 6) ?
        <div className='flex items-center justify-center'>
        <button onClick={() => dispatch(setCurrentPage())} className='load-more text-[16px] px-4 py-2 font-medium text-[#696A75] rounded-[6px] border-[#696a75b2] border-solid border-[1px]'>{ loading ? 'Loading...' : 'Load More' }</button>
      </div>  
      : null}
    </div>
  );
}

export default PostsLoadMore;
