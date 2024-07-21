import PostCart from "./PostCart.jsx";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow } from 'swiper/modules';

const LatestPosts = ({ posts, title }) => {
  
  return (
    <div className="latest-posts">
    <h1 className="text-[#181A2A] m-[20px] font-bold text-[25px]">{ title }</h1>
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
      modules={[EffectCoverflow]}
      className="mySwiper"
    >
      {posts && posts.slice(0, 7).map((post, index) => 
        <SwiperSlide key={index} className={`!w-[400px] slide-${index + 1}`}>
          <PostCart post={post} />
        </SwiperSlide>
      )}  
    </Swiper>
  </div>
  );
}

export default LatestPosts;
