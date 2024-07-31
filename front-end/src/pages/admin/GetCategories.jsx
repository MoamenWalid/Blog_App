import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../components/redux/slices/categorySlice';
import BoxCategory from '../../components/categories/BoxCategory';

const GetCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className='container mx-auto'>
      <h1 className='text-[#181A2A] m-[20px] font-bold text-[25px]'>list of all Categories</h1>
      <div className="boxes grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.length && categories.map(category => (
            <div className='box' key={category?._id}>
              <BoxCategory title={ category.title } img={ category?.img?.url } />
            </div>
          ))}
      </div>
    </div>
  );
}

export default GetCategories;
