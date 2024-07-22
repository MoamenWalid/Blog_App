// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './style_categories.scss';
import BoxCategory from './BoxCategory';

const Categories = ({ title }) => {
  return (
    <div className="categories">
      <h1 className='text-[#181A2A] m-[20px] font-bold text-[25px]'>{ title }</h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
        <SwiperSlide>
          <BoxCategory categoryName="Phones" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Categories;
