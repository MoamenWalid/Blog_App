import { Link } from 'react-router-dom';
import './box_category.scss';

const BoxCategory = ({ title, img }) => {
  return (
    <Link to={ `/posts/${ title }` } className='box-category bg-[#adadad33] flex flex-col gap-5 items-center justify-center h-[200px] w-[200px] rounded-xl'>
      <div className="photo w-[100px]">
        <img src={ img } alt="img-category" />
      </div>

      <p className='text-[16px] font-extralight capitalize'>{ title }</p>
    </Link>
  );
}

export default BoxCategory;
