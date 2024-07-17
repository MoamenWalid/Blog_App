
const CreatePost = () => {
  return (
    <div className="create-post form-parent flex-col gap-[20px] !items-center">
      <h1 className="text-[30px] font-medium">Create a new post</h1>
      <form action="" className="form-div !w-[98%] md:!w-[470px] flex flex-col gap-[17px]">
        <div className="field flex flex-col gap-[6px]">
          <label className="text-[#adadad] text-[14px]" htmlFor="post-title">Post Title</label>
          <input type="text" id="post-title" placeholder="Post title" />
        </div>

        <div className="field flex flex-col gap-[6px]">
          <label className="text-[#adadad] text-[14px]" htmlFor="categories">Categories</label>
          <select id="categories">
            <option value="music">music</option>
            <option value="qura'n">qura'n</option>
            <option value="blog">blog</option>
          </select>
        </div>

        <div className="field flex flex-col gap-[6px]">
          <label className="text-[#adadad] text-[14px]"  htmlFor="post-desc">Post description</label>
          <textarea id="post-desc" className="desc" placeholder="Post description" />
        </div>
        
        <input type="file" id="upload-img" />
        <button type="button" className="form-btn mt-[10px] !mb-0">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
