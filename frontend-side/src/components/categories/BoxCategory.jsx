import { Link } from 'react-router-dom';
import './box_category.scss';
import { useState } from 'react';
import Spinner from '../animation/Spinner';

const BoxCategory = ({ title, img }) => {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Link to={ `/posts/${ title }` } className='box-category bg-[#adadad33] flex flex-col gap-5 items-center justify-center min-h-[200px] min-w-[200px] rounded-xl'>
      <div className="photo w-[100px]">
      { loading ? <Spinner /> : null}
        <img loading='lazy' onLoad={ handleImageLoad } src={ img } alt="img-category" />
      </div>

      <p className='text-[16px] font-extralight capitalize'>{ title }</p>
    </Link>
  );
}

export default BoxCategory;
