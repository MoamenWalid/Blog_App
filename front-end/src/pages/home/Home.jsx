import PostCart from "../../components/blog/PostCart";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../components/redux/slices/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts(''));
  }, [dispatch])

  return (
    <section className="home">
      <div className="latest-posts">
        <h1 className="text-[#181A2A] font-bold text-[24px]">Latest Post</h1>
        <Swiper
          effect={'coverflow'}
          centeredSlides={true}
          initialSlide={2}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {posts && posts.map((post, index) => 
            <SwiperSlide key={index} className={`!w-[400px] slide-${index + 1}`}>
              <PostCart post={post} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default Home;
