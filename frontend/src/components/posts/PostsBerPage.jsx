import PostCart from './PostCart.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBerPage, getPostsCount } from '../redux/slices/postSlice.js';

const BER_PAGE = 6;

const PostsBerPage = ({ title }) => {
  const dispatch = useDispatch();
  const { postsBerPage } = useSelector(state => state.post);  


  useEffect(() => {
    dispatch(getPostsCount(''));
    if (postsBerPage.currentPage === 1) {
      dispatch(getPostsBerPage(postsBerPage.currentPage));
    }
  }, []);

  const getMore = () => {
    dispatch(getPostsBerPage(postsBerPage.currentPage));
  }

  return (
    <div className='container mx-auto my-5 px-3 sm:px-0'>
      <h1 className="text-[#181A2A] mb-5 font-bold text-[25px]">{ title }</h1>
      <div className='posts-load-more mb-[56px]  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {postsBerPage.posts.map((post, index) => (
          <PostCart key={`${post?._id}-${index}-post`} post={post} />
        ))}
      </div>
      
      { postsBerPage.currentPage <= Math.ceil(postsBerPage.postsCount / BER_PAGE) || postsBerPage.loading ?
        <div className='flex items-center justify-center'>
          <button disabled={ postsBerPage.loading ? true : false } onClick={ getMore } className='load-more text-[16px] px-4 py-2 font-medium text-[#696A75] rounded-[6px] border-[#696a75b2] border-solid border-[1px]'>{ postsBerPage.loading ? 'Loading...' : 'Load More' }</button>
        </div>  
      : null}
    </div>
  );
}

export default PostsBerPage;
