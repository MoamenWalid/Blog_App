import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../components/redux/slices/postSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { getCategories } from "../../components/redux/slices/categorySlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.post.createSinglePost); 
  const { categories } = useSelector(state => state.category); 
  const image = useRef(null);
  const title = useRef(null);
  const category = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

  const checkOfRefs = () => {
    if (!title.current.value) toast.error('Title is required!!');
    else if (!description.current.value) toast.error('Description is required!!');
    else if (!image.current.value) toast.error('Image is required!!');
    else {
      dispatch(createPost({
        image: image.current.files[0],
        title: title.current.value,
        category: category.current.value,
        description: description.current.value
      })).then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            Swal.fire({
              title: "Create post successfully",
              icon: "success",
              confirmButtonText: "OK"
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/');
              }
            });
          }
        })
      }
  }

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    checkOfRefs();
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="create-post form-parent flex-col gap-[20px] !items-center">
        <h1 className="text-[30px] font-medium">Create a new post</h1>
        <form onSubmit={handleSubmitCreate} action="" className="form-div !w-[98%] md:!w-[470px] flex flex-col gap-[17px]">
          <div className="field flex flex-col gap-[6px]">
            <label className="text-[#adadad] text-[14px]" htmlFor="post-title">Post Title</label>
            <input ref={title} type="text" id="post-title" placeholder="Post title" />
          </div>
      
          <div className="field flex flex-col gap-[6px]">
            <label className="text-[#adadad] text-[14px]" htmlFor="categories">Categories</label>
            <select ref={category} id="categories">
              {categories.map(category => 
                <option key={category._id} value="music">{ category?.title }</option>
              )}
            </select>
          </div>
      
          <div className="field flex flex-col gap-[6px]">
            <label className="text-[#adadad] text-[14px]"  htmlFor="post-desc">Post description</label>
            <textarea ref={description} id="post-desc" className="desc" placeholder="Post description" />
          </div>
          
          <input ref={image} type="file" id="upload-img" />
          <button disabled={ loading ? true : false } type="submit" className="form-btn mt-[10px] !mb-0">{ loading ? "Loading..." : "Create" }</button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
