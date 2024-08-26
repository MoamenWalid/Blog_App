import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../../components/redux/slices/commentSlice';
import { Link } from 'react-router-dom';
import { convertDate } from '../../components/convernDate';

const GetComments = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(getAllComments());
    console.log(comments);
  }, [dispatch]);


  return (
    <div className='container mx-auto mt-[30px] mb-[56px] md:mb-[90px]'>
      <h1 className="text-[#181A2A] m-[20px] font-bold text-[25px]">All comments</h1>
      <div className='comments flex flex-col gap-5'>
        {comments && comments.map(comment =>
          <div key={comment?._id} className="comment flex flex-col gap-[20px] p-[20px] bg-[#ffffff30] rounded-[8px] [box-shadow:2px_2px_8px_var(--shadow-gray)]">
            <Link to={`/profile/${comment?.user?._id}`} className="user flex items-center gap-4">
              <div className="avatar overflow-hidden w-[30px] h-[30px] rounded-full">
                <img loading='lazy' className='w-full h-full object-cover object-center' src={comment?.user?.profilePhoto?.url} alt="avatar-user" />
              </div>
              <span className="username font-medium text-gray text-[15px]">{comment?.user?.username}</span>
              <span className="created-at font-normal text-gray text-[15px]">{convertDate(comment?.createdAt)}</span>
            </Link>
        
            <p className="text-of-comment">{ comment?.text }</p>
        
            <Link to={`/posts/details/${ comment?.postId?._id }`} className="post w-fit text-blue">View post</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetComments;
