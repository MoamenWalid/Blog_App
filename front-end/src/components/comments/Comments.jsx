import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteComment, editComment, getComments } from '../redux/slices/commentSlice';
import { ToastContainer } from 'react-toastify';
import { convertDate } from '../convernDate';
import { Link } from 'react-router-dom';
import Spinner from '../animation/Spinner';
import Swal from 'sweetalert2';


const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const text = useRef(null);
  const { user } = useSelector(state => state.auth);
  const { comments, loading } = useSelector(state => state.comment);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [editableText, setEditableText] = useState('');

  useEffect(() => {
    if (postId) dispatch(getComments(postId));
  }, [dispatch, postId]);

  const handleSubmitComment = () => {
    if (text.current.value && postId) {
      setSubmitLoading(true);
      dispatch(createComment({ postId, text: text.current.value.trim() }))
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            setSubmitLoading(false);
            text.current.value = '';
          }
        });
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditableCommentId(commentId);
    setEditableText(commentText);
  };

  const handleSaveComment = (commentId) => {
    if (postId && commentId && editableText) {
      dispatch(editComment({ postId, commentId, text: editableText }))
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            setEditableCommentId(null);
            setEditableText('');
          }
        });
    }
  };

  const handleUnsaveEditComment = () => {
    setEditableCommentId(null);
    setEditableText('');
  }

  const handleDeleteComment = (commentId) => {
    if (postId && commentId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteComment({ postId, commentId }))
            .then((result) => {
              if (result.meta.requestStatus === 'fulfilled') {
                Swal.fire({
                  title: "Deleted!",
                  text: "The commit has been deleted.",
                  icon: "success"
                });
              }
            })
        }
      });
    }
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <div className='container mx-auto px-3 grid gap-6 grid-cols-1 md:grid-cols-2'>
        {user ? 
          <div className="add-comment">
            <h2 className='text-dark text-[23px] font-medium mb-4'>Add your comment</h2>
            <textarea ref={text} className='w-full max-w-[550px] h-[200px] mb-4' type="text" placeholder='Write your comment' />
            <button disabled={submitLoading ? true : false} onClick={handleSubmitComment} className='w-[130px] bg-[#111] text-[#FFF] p-[10px_20px]' type='button'>{submitLoading ? 'Loading...' : 'Sent'}</button>
          </div>
          : null
        }

        {comments && comments.length ? <div className="show-comments">
          <h2 className='text-dark text-[23px] font-medium mb-4'>Comments <span className='text-blue ml-[5px] bg-[#f6f8ff] font-normal text-[19px] px-[10px] rounded-[6px]'>{comments.length}</span></h2>
          <div className="comments relative flex flex-col h-auto max-h-[400px] overflow-auto gap-[20px] bg-[#ffffff6b] p-[20px] rounded-[10px]">
            {loading ? <Spinner /> : null}
            {comments && comments.map(comment =>
              <div key={comment._id} className="comment flex flex-col gap-[20px] p-[20px] bg-[#ffffff30] rounded-[8px] [box-shadow:2px_2px_8px_var(--shadow-gray)]">
                <Link to={`/profile/${comment?.user?._id}`} className="user flex items-center gap-4">
                  <div className="avatar overflow-hidden w-[30px] h-[30px] rounded-full">
                    <img loading='lazy' className='w-full h-full object-cover object-center' src={comment?.user?.profilePhoto?.url} alt="avatar-user" />
                  </div>
                  <span className="username font-medium text-gray text-[15px]">{comment?.user?.username}</span>
                  <span className="created-at font-normal text-gray text-[15px]">{convertDate(comment?.createdAt)}</span>
                </Link>

                {editableCommentId === comment._id ? (
                  <textarea
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className='w-full min-h-[100px]'
                  />
                ) : (
                  <p className='whitespace-break-spaces'>{comment?.text}</p>
                )}

                <div className="comment-changes flex items-center gap-[15px] w-[fit-content] ml-auto">
                  { comment?.user?._id === user?._id ? <div className="edit">
                    {editableCommentId === comment._id ? (
                      <>
                        <button onClick={() => handleUnsaveEditComment()} type='button' className="save-comment">
                          <i className="bi bi-x text-[20px] text-red-700"></i>
                        </button>

                        <button onClick={() => handleSaveComment(comment._id)} type='button' className="save-comment">
                          <i className="bi bi-check text-[20px] text-[#009688]"></i>
                        </button>
                      </>
                      
                    ) : (
                      <button onClick={() => handleEditComment(comment._id, comment.text)} type='button' className="edit-comment">
                        <i className="bi bi-pencil-square text-[20px] text-[#009688]"></i>
                      </button>
                    )}
                  </div> : null }

                  { comment?.user?._id === user?._id || user?.isAdmin ? <button onClick={() => handleDeleteComment(comment?._id)} type='button' className="delete-comment">
                    <i className="bi bi-trash3 text-[20px] text-[#E91E63]"></i>
                  </button> : null }
                </div>
              </div>
            )}
          </div>
        </div> : null}
      </div>
    </>
  );
}

export default Comments;
