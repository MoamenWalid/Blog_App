import { convertDate } from '../convernDate';
import './post_cart.scss';

const PostCart = ({ post }) => {
  console.log(post);

  return (
    <div className='post-cart cursor-pointer bg-[#ffffff59] border border-[#e6e6e6] rounded-xl p-4'>
      <div className="photo overflow-hidden rounded-xl mb-4">
        <img width='100%' height='100%' className='min-h-[240px] max-h-[240px] object-cover object-center' src={ post.image.url } alt="post-cart" />
      </div>

      <span className="category block w-fit rounded-md px-[10px] py-[4px] mb-4 font-medium text-[#4B6BFB] bg-[#f6f8ff] ">{ post.category }</span>

      <div className="desc font-bold mb-5 text-[24px] text-[#181A2A]">
        { post.description }
      </div>

      <div className="author flex items-center flex-row gap-4">
        <div className="avatar w-[36px] h-[36px] rounded-full overflow-hidden">
          <img className='w-full h-full object-cover object-[center_top]' src={ post.user.profilePhoto.url } alt="avatar" />
        </div>

        <span className="name block text-[16px] font-medium text-[#97989F]">{ post.user.username }</span>
        <p className="time-created-at text-[16px] text-[#97989F]">{ convertDate(post.createdAt) }</p>
      </div>
    </div>
  );
}

export default PostCart;
