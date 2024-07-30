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
import Spinner from '../animation/Spinner';
import Categories from '../categories/Categories';

const PostsBerCategory = ({ title }) => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [onPageChage, setOnPageChange] = useState(1);
  const { postsPerCategory } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPostsCount(category));
  }, [dispatch, category])

  useEffect(() => {
    dispatch(getPostsPerCategory({ page: onPageChage, category }));
  }, [onPageChage, dispatch, category])

  return (
    <>
      { postsPerCategory.postsLength 
        ? <div className='posts-per-category container mx-auto px-3 mt-[30px] md:mt-[56px] sm:px-0 mb-[56px] lg:mb-[111px]'>
        <h1 className="text-[#181A2A] mb-5 font-bold text-[25px]">{ title }</h1>
        <>
        { postsPerCategory.loading ? <Spinner /> : null }
      
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
        : <h1 className='text-[#181A2A] w-fit mx-auto mt-[40px] mb-[56px] lg:mb-[90px] font-bold text-[25px]'>Not found posts of <span className='text-red-600'>{ category }</span></h1> }
      
      <Categories title='Categories'/>
    </>
  );
}

export default PostsBerCategory;
