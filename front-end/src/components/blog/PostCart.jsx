import './post_cart.scss';

const PostCart = () => {
  return (
    <div className='post-cart bg-[#ffffff59] border border-[#e6e6e6] rounded-xl p-4'>
      <div className="photo overflow-hidden rounded-xl mb-4">
        <img width='100%' height='100%' className='min-h-[240px] max-h-[240px] object-cover object-center' src="https://res.cloudinary.com/dik3tkacx/image/upload/v1721218474/nktsylg370zzyowsxtc2.jpg" alt="post-cart" />
      </div>

      <span className="category block w-fit rounded-md px-[10px] py-[4px] mb-4 font-medium text-[#4B6BFB] bg-[#f6f8ff] ">Technology</span>

      <div className="desc font-bold mb-5 text-[24px] text-[#181A2A]">
        The Impact of Technology on the Workplace: How Technology is Changing
      </div>

      <div className="author flex items-center flex-row gap-4">
        <div className="avatar w-[36px] h-[36px] rounded-full overflow-hidden">
          <img src="https://res.cloudinary.com/dik3tkacx/image/upload/v1721218474/nktsylg370zzyowsxtc2.jpg" alt="avatar" />
        </div>

        <span className="name block text-[16px] font-medium text-[#97989F]">Moamen Walid</span>
        <p className="time-created-at text-[16px] text-[#97989F]">August 20, 2022</p>
      </div>
    </div>
  );
}

export default PostCart;
