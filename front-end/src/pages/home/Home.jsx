
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../components/redux/slices/postSlice";
import LatestPosts from "../../components/posts/LatestPosts";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts(''));
  }, [dispatch])

  return (
    <section className="home">
      <LatestPosts posts={posts} title='Latest Post' />
    </section>
  );
}

export default Home;
