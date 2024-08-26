import Categories from "../../components/categories/Categories.jsx";
import PostsBerPage from "../../components/posts/PostsBerPage.jsx";

const PostsPage = () => {
  return (
    <div className="posts-page mb-[56px] md:mb-[111px]">
      <Categories title='Categories' />
      <PostsBerPage title='Posts' />
    </div>
  );
}

export default PostsPage;
