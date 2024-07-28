import React, { useEffect, useState } from 'react';
import Paginations from '../pagination/Paginations';
import { getPostsCount, getPostsPerCategory } from '../redux/slices/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCart from './PostCart';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';
import './post_per_category.scss';

const PostsBerCategory = ({ title }) => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [onPageChage, setOnPageChange] = useState(1);
  const { postsPerCategory } = useSelector(state => state.post);  

  useEffect(() => {
    dispatch(getPostsCount(category));
  }, [])

  useEffect(() => {
    dispatch(getPostsPerCategory({ page: onPageChage, category }));
  }, [onPageChage, dispatch, category, postsPerCategory.loading])

  return (
    <div className='posts-per-category container mx-auto my-5 px-3 sm:px-0'>
      <h1 className="text-[#181A2A] mb-5 font-bold text-[25px]">{ title }</h1>
      <>
      <Swiper
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper min-h-[400px]"
      >
        {postsPerCategory.posts.map(post => (
        <SwiperSlide key={ `${post._id}` }>
          <PostCart post={post} className='w-[300px] md:w-[370px] select-none' />
        </SwiperSlide>
      ))}
      </Swiper>
      </>

      { Math.ceil(postsPerCategory.postsLength / 6) > 1 ? 
        <Paginations totalItemsCount={ Math.ceil(postsPerCategory.postsLength / 6) } setOnPageChange={ setOnPageChange } />
      : null }
    </div>
  );
}

export default PostsBerCategory;
