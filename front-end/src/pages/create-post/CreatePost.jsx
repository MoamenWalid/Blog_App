
const CreatePost = () => {
  return (
    <div className="create-post form-parent flex-col gap-[20px] !items-center">
      <h1 className="text-[30px] font-medium">Create a new post</h1>
      <form action="" className="form-div flex flex-col gap-[17px]">
        <input type="text" placeholder="Post title" />
        <select id="select-cats">
          <option value="music">music</option>
          <option value="qura'n">qura'n</option>
          <option value="blog">blog</option>
        </select>
        <textarea id="description" className="desc" placeholder="Post description" />
        <input type="file" id="upload-img" />
        <button type="button" className="form-btn mt-[10px] !mb-0">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
