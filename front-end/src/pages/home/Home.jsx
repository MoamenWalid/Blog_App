import PostCart from "../../components/blog/PostCart";

const Home = () => {
  return (
    <section className="home">
      <div className="container px-3 mx-auto mt-[20px] grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
        <PostCart />
      </div>
    </section>
  );
}

export default Home;
