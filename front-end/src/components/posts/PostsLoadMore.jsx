
const PostsLoadMore = ({ title }) => {
  

  return (
    <div className='container mx-auto mt-5 px-3'>
      <h1 className="text-[#181A2A] mb-5 font-bold text-[25px]">{ title }</h1>
      <div className='posts-load-more mb-5  grid gap-4 grid-cols-1 md:grid-cols-3'>
        {/* {loadMore.posts.length ? loadMore.posts.map((post, index) => 
          <PostCart key={`${index}-${post?._id}`} post={post} />
        ) : null}   */}
      </div>
      <div className='flex items-center justify-center'>
        <button className='load-more text-[16px] px-4 py-2 font-medium text-[#696A75] rounded-[6px] border-[#696a75b2] border-solid border-[1px]'>Load More</button>
      </div>  
    </div>
  );
}

export default PostsLoadMore;
