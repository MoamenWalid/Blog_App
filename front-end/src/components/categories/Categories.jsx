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
        spaceBetween={ 35 }
        className="mySwiper min-h-[200px]"
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {categories?.map(category => (
          <SwiperSlide key={category?._id}>
            <BoxCategory title={ category.title } img={ category?.img?.url } />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
