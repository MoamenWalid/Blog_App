import React from 'react';

const BoxCategory = ({ categoryName }) => {
  return (
    <div className='box-category flex items-center justify-center h-[60px] w-[100px] bg-white rounded-[6px]'>
      { categoryName }
    </div>
  );
}

export default BoxCategory;
