import PostCart from './PostCart.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, getPostsCount, getPostsBerCategory } from '../redux/slices/postSlice.js';
import { useParams } from 'react-router-dom';

const BER_PAGE = 6;

const PostsBerCategory = ({ title }) => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsBerCategory } = useSelector(state => state.post);  


  useEffect(() => {
    if (postsBerCategory.currentPage === 1) {
      dispatch(getPostsBerCategory(category));
      dispatch(setCurrentPage());
    }
  }, []);

  const getMore = () => {
    dispatch(getPostsBerCategory(category));
    dispatch(setCurrentPage());
  }

  return (
    <div className='container mx-auto mt-5 px-3 sm:px-0'>
      <h1 className="text-[#181A2A] mb-5 font-bold text-[25px]">{ title }</h1>
      <div className='posts-load-more mb-5  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {postsBerCategory.posts.map((post, index) => (
          <PostCart key={`${post?._id}-${index}-post`} post={post} />
        ))}
      </div>
      
      { postsBerCategory.currentPage <= Math.ceil(postsBerCategory.postsCount / BER_PAGE) || postsBerCategory.loading ?
        <div className='flex items-center justify-center'>
          <button disabled={ postsBerCategory.loading ? true : false } onClick={ getMore } className='load-more text-[16px] px-4 py-2 font-medium text-[#696A75] rounded-[6px] border-[#696a75b2] border-solid border-[1px]'>{ postsBerCategory.loading ? 'Loading...' : 'Load More' }</button>
        </div>  
      : null}
    </div>
  );
}

export default PostsBerCategory;
