import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../components/redux/slices/userSlice";
import { getPosts } from "../../components/redux/slices/postSlice";
import { getAllComments } from "../../components/redux/slices/commentSlice";
import { createCategory, getCategories } from "../../components/redux/slices/categorySlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Admin = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { categories } = useSelector(state => state.category);
  const { comments } = useSelector(state => state.comment);
  const addCatTitle = useRef(null);
  const addCatImage = useRef(null);
  
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getPosts(''));
    dispatch(getCategories());
    dispatch(getAllComments());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (addCatTitle?.current?.value) {
      if (addCatImage?.current?.value) {
        dispatch(createCategory({ title: addCatTitle.current.value, img: addCatImage.current.value }));
      } else {
        dispatch(createCategory({ title: addCatTitle.current.value }));
      }

      addCatTitle.current.value = '';
      addCatImage.current.value = '';
    }
  }

  return (
    <div>
      <ToastContainer position="top-center" />
      <div className="dashboard container mx-auto py-3 mt-[40px]">
        <div className="collection grid gap-3 mb-[30px] grid-cols-1 xsm:grid-cols-2 md:grid-cols-4">
          <div className="users [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white p-[30px] rounded-[10px] flex gap-2 flex-col items-start">
            <h3 className="title flex gap-2 text-[20px] font-medium">
              <i className="bi bi-people"></i>
              Users
            </h3>
            <span className="num text-[23px] font-medium text-black">{ users?.length }</span>
            <Link to='/admin-dashboard/users' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all users</Link>
          </div>
      
          <div className="posts [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white p-[30px] rounded-[10px] flex gap-2 flex-col items-start">
            <h3 className="title flex gap-2 text-[20px] font-medium">
              <i className="bi bi-stickies"></i>
              Posts
            </h3>
            <span className="num text-[23px] font-medium text-black">{ posts?.length }</span>
            <Link to='/admin-dashboard/posts' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all posts</Link>
          </div>
      
          <div className="cats [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white p-[30px] rounded-[10px] flex gap-2 flex-col items-start">
            <h3 className="title flex gap-2 text-[20px] font-medium">
              <i className="bi bi-tags"></i>
              Categories
            </h3>
            <span className="num text-[23px] font-medium text-black">{ categories?.length }</span>
            <Link to='/admin-dashboard/categories' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all categories</Link>
          </div>
      
          <div className="comments [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white p-[30px] rounded-[10px] flex gap-2 flex-col items-start">
            <h3 className="title flex gap-2 text-[20px] font-medium">
              <i className="bi bi-chat-dots"></i>
              Comments
            </h3>
            <span className="num text-[23px] font-medium text-black">{ comments?.length }</span>
            <Link to='/admin-dashboard/comments' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all comments</Link>
          </div>
        </div>
      
        <div className="form-parent !mt-[40px]">
          <div className="add-new-cat form-div !p-[25px]">
            <h2 className="text-[23px] text-center font-medium mb-[25px]">Add a new category</h2>
            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-gray">Category title</label>
                <input id="title" ref={ addCatTitle } type="text" placeholder="Enter a category title" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-gray">Category link of image</label>
                <input id="image" ref={ addCatImage } type="text" placeholder="Enter a category link of image" />
              </div>
              <button onClick={ handleAddCategory } type="button" className="form-btn mt-5">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
