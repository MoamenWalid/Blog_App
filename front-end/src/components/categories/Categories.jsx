// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import BoxCategory from "./BoxCategory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/slices/categorySlice";
import "./categories.scss";

const Categories = ({ title }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="categories container mx-auto px-3 md:px-0 mb-[56px] md:mb-[111px]">
      <h1 className="text-[#181A2A] m-[20px] font-bold text-[25px]">{title}</h1>
      <Swiper
        pagination={{ clickable: true }}
        className="mySwiper min-h-[200px]"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 35,
          },
        }}
      >
        {categories.map(category => (
          <SwiperSlide key={category?._id}>
            <BoxCategory title={ category.title } img={ category?.img?.url } />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
