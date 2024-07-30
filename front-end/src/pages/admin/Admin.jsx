import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../components/redux/slices/userSlice";
import { getPosts } from "../../components/redux/slices/postSlice";
import { getAllComments } from "../../components/redux/slices/commentSlice";
import { getCategories } from "../../components/redux/slices/categorySlice";
import { Link } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { categories } = useSelector(state => state.category);
  const { comments } = useSelector(state => state.comment);
  
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getPosts(''));
    dispatch(getCategories());
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <div className="dashboard container mx-auto py-3 mt-[40px]">
      <div className="collection grid gap-3 mb-[30px] grid-cols-1 xsm:grid-cols-2 md:grid-cols-4">
        <div className="users [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-people"></i>
            Users
          </h3>
          <span className="num text-[23px] font-medium text-black">{ users?.length }</span>
          <Link to='/admin-dashboard/users' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all users</Link>
        </div>

        <div className="posts [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-stickies"></i>
            Posts
          </h3>
          <span className="num text-[23px] font-medium text-black">{ posts?.length }</span>
          <Link to='/admin-dashboard/posts' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all posts</Link>
        </div>

        <div className="cats [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-tags"></i>
            Categories
          </h3>
          <span className="num text-[23px] font-medium text-black">{ categories?.length }</span>
          <Link to='/admin-dashboard/categories' className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all categories</Link>
        </div>

        <div className="comments [box-shadow:1px_1px_5px_#3f3f3f1a] bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
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
          <form action="" className="flex flex-col gap-3">
            <label htmlFor="" className="text-gray">Category title</label>
            <input type="text" placeholder="Enter a category title" />
            <button type="button" className="form-btn mt-5">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
