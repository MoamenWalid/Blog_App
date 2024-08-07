import { Link } from 'react-router-dom';
import { convertDate } from '../convernDate';
import './post_cart.scss';
import { useState } from 'react';
import { truncateText } from '../truncateText';
import Spinner from '../animation/Spinner';

const PostCart = ({ post, className }) => {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`post-cart relative ${className} bg-[#ffffff59] border border-[#e6e6e6] rounded-xl p-4`}>
      <div className="relative min-h-[240px] max-h-[240px] photo overflow-hidden rounded-xl mb-4">
        {loading ? <Spinner /> : null}
        <Link to={`/posts/details/${post._id}`}>
          <img loading='lazy' onLoad={handleImageLoad} width='100%' height='100%' className='img-post min-h-[240px] object-cover object-center' src={post?.image.url} alt="post-cart" />
        </Link>
      </div>
      
      <span className="category block w-fit rounded-md px-[10px] py-[4px] mb-4 font-medium text-[#4B6BFB] bg-[#f6f8ff]">
        {post?.category}
      </span>
      
      <Link to={`/posts/details/${post._id}`} className="title block font-bold mb-5 text-[24px] text-[#181A2A]">
        {truncateText(post?.title, 4)}
      </Link>
      
      <Link to={`/profile/${post?.user?._id}`} className="author w-fit flex items-center flex-row gap-4">
        <div className="avatar w-[36px] h-[36px] rounded-full overflow-hidden">
          <img loading='lazy' className='w-full h-full object-cover object-[center_top]' src={post?.user?.profilePhoto?.url} alt="avatar" />
        </div>
        <span className="name block text-[16px] font-medium text-[#97989F]">
          {post?.user.username}
        </span>
        <p className="time-created-at text-[16px] text-[#97989F]">
          {convertDate(post?.createdAt)}
        </p>
      </Link>
    </div>
  );
}

export default PostCart;
