import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments } from '../redux/slices/commentSlice';
import { ToastContainer } from 'react-toastify';
import { convertDate } from '../convernDate';
import { Link } from 'react-router-dom';
import '../animation/spiner.scss';

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const text = useRef(null);
  const { user } = useSelector(state => state.auth);
  const { comments, loading } = useSelector(state => state.comment);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (postId) dispatch(getComments(postId));
  }, [dispatch, postId])

  const handleSubmitComment = () => {
    setSubmitLoading(true);
    if (text.current.value && postId) {
      dispatch(createComment({ postId, text: text.current.value }))
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            setSubmitLoading(false);
            text.current.value = '';
          }
      })
    }
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <div className='container mx-auto px-3 grid gap-6 grid-cols-1 md:grid-cols-2'>
        { user ? 
          <div className="add-comment">
            <h2 className='text-dark text-[23px] font-medium mb-4'>Add your comment</h2>
            <textarea ref={ text } className='w-full max-w-[550px] h-[200px] mb-4' type="text" placeholder='Write your comment' />
            <button disabled={ submitLoading ? true : false } onClick={ handleSubmitComment } className='w-[130px] bg-[#111] text-[#FFF] p-[10px_20px]' type='button'>{ submitLoading ? 'Loading...' : 'Sent' }</button>
          </div>
        : null }
      
        <div className="show-comments">
          <h2 className='text-dark text-[23px] font-medium mb-4'>Comments</h2>
          <div className="comments relative flex flex-col h-[400px] overflow-auto gap-[20px] bg-[#ffffff6b] p-[20px] rounded-[10px]">
            { loading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : null }
            {comments && comments.map(comment => 
              <div key={comment._id} className="comment flex flex-col gap-[20px] p-[20px] bg-[#ffffff30] rounded-[8px] [box-shadow:2px_2px_8px_var(--shadow-gray)]">
                <Link to={`/profile/${comment?.user?._id}`} className="user flex items-center gap-4">
                  <div className="avatar overflow-hidden w-[30px] h-[30px] rounded-full">
                    <img loading='lazy' className='w-full h-full object-cover object-center' src={ comment?.user?.profilePhoto?.url } alt="avatar-user" />
                  </div>

                  <span className="username font-medium text-gray">{ comment?.user?.username }</span>
                  <span className="created-at font-normal text-gray">{ convertDate(comment?.createdAt) }</span>
                </Link>

                <p>{ comment?.text }</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
