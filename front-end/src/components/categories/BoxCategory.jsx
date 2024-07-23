import './box_category.scss';

const BoxCategory = () => {
  return (
    <div className='box-category bg-[#adadad33] flex flex-col gap-5 items-center justify-center h-[200px] w-[200px] rounded-xl'>
      <div className="photo w-[100px]">
        <img src='https://cdn-icons-png.flaticon.com/512/847/847969.png' alt="img-category" />
      </div>

      <p>Category</p>
    </div>
  );
}

export default BoxCategory;
