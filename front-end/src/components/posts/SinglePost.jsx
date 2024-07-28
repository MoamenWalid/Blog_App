import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPosts, getSinglePost } from '../redux/slices/postSlice';
import '../animation/spiner.scss';
import { convertDate } from '../convernDate.js';
import Comments from '../comments/Comments.jsx';

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const { singlePost } = useSelector(state => state.post);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSinglePost(id));
    dispatch(getPosts(''));
  }, [dispatch, id])

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <section id='single-post' className='mb-[56px] md:mb-[111px]'>
      { singlePost.loading ? 
        <div className='w-full h-screen bg-white fixed top-[60px] z-30'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      : null }

      <div className="single-post flex flex-col justify-between gap-3 md:flex-row container mx-auto px-3 mt-[30px] md:mt-[56px] mb-[35px]">
        <div className='content w-full md:w-[70%]'>
        <div className="photo relative rounded-md overflow-hidden w-full h-[200px] sm:h-[300px] lg:h-[500px] xl-[600px] mb-[16px] md:mb-[32px]">
          { loading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : null}
          <img loading='lazy' className='h-full object-cover object-center' onLoad={ handleImageLoad } width='100%' height='100%' src={ singlePost?.post?.image?.url } alt="post-img" />
          </div>

          <Link to={`/posts/${ singlePost?.post?.category }`} className="category block w-fit bg-blue text-white px-4 py-[6px] rounded-md mb-[16px]">{ singlePost?.post?.category }</Link>
          
          <h1 className='text-[30px] md:text-[36px] font-medium text-dark mb-[16px] md:mb-[25px]'>{ singlePost?.post.title }</h1>
          
          <Link to={`/profile/${ singlePost?.post?.user?._id }`} className="user flex flex-row items-center gap-3 mb-[16px] md:mb-[25px]">
            <div className="avatar overflow-hidden w-[50px] h-[50px] rounded-full">
              <img className='w-full h-full object-cover object-center' src={ singlePost?.post?.user?.profilePhoto?.url } alt="avatar-user" />
            </div>
            <span className="username font-medium text-gray">{ singlePost?.post?.user?.username }</span>
            <span className="created-at font-normal text-gray">{ convertDate(singlePost?.post?.createdAt) }</span>
          </Link>
        
          <p className="description whitespace-break-spaces text-[18px] md:text-[20px] mb-[16px] md:mb-[32px]">{ singlePost?.post?.description }</p>
        </div>

        <div className="last-3-posts sticky top-[100px] max-h-screen flex flex-col gap-4 w-full md:w-[25%]">
          <h2 className='text-dark text-[23px] font-medium'>You can also read</h2>
          <div className='posts grid gap-[25px] grid-cols-1 sm:grid-cols-2 md:grid-cols-1'>
            { posts && posts.slice(0, 4).map(post => 
              post?.id !== singlePost?.post?._id ?
              <Link to={`/posts/details/${post?._id}`} className='post-in-lastes flex flex-row md:flex-col lg:flex-row gap-3' key={post?._id}>
                <div className="avatar overflow-hidden w-[50px] h-[50px] rounded-full">
                  <img loading='lazy' className='w-full h-full object-cover object-center' src={ post?.user?.profilePhoto?.url } alt="avatar-user" />
                </div>
            
                <div className="box">
                  <div className="title">{ post?.title }</div>
                  <div className="user flex flex-row gap-3">
                    <span className="username font-medium text-gray">{ post?.user?.username }</span>
                    <span className="created-at font-normal text-gray">{ convertDate(post?.createdAt) }</span>
                  </div>
                </div>
              </Link>
              : null
            ) }
          </div>
        </div>
      </div>

      <Comments postId={ singlePost?.post?._id } />
    </section>
  );
}

export default SinglePost;
