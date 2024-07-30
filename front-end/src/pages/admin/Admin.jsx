
const Admin = () => {
  return (
    <div className="dashboard container mx-auto py-3 mt-[40px]">
      <div className="collection grid gap-3 mb-[30px] grid-cols-1 xsm:grid-cols-2 md:grid-cols-4">
        <div style={{ boxShadow: '1px 1px 5px #3f3f3f1a' }} className="users bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-people"></i>
            Users
          </h3>
          <span className="num text-[23px] font-medium text-black">120</span>
          <button className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all users</button>
        </div>

        <div style={{ boxShadow: '1px 1px 5px #3f3f3f1a' }} className="posts bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-stickies"></i>
            Posts
          </h3>
          <span className="num text-[23px] font-medium text-black">120</span>
          <button className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all posts</button>
        </div>

        <div style={{ boxShadow: '1px 1px 5px #3f3f3f1a' }} className="cats bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-tags"></i>
            Categories
          </h3>
          <span className="num text-[23px] font-medium text-black">120</span>
          <button className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all categories</button>
        </div>

        <div style={{ boxShadow: '1px 1px 5px #3f3f3f1a' }} className="comments bg-white py-[15px] px-[20px] rounded-[10px] flex gap-2 flex-col items-start">
          <h3 className="title flex gap-2 text-[20px] font-medium">
            <i className="bi bi-chat-dots"></i>
            Comments
          </h3>
          <span className="num text-[23px] font-medium text-black">120</span>
          <button className="show-all text-[12px] md:text-[14px] bg-[#111] text-[#FFF] py-[5px] px-[10px]">See all comments</button>
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
