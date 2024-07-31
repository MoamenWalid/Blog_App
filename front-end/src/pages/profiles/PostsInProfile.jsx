import React from 'react';
import PostCart from '../../components/posts/PostCart';

const PostsInProfile = ({ username, posts }) => {
  return (
    <>
      {posts?.length ? (
        <>
          <h1 className="text-[#181A2A] m-[20px] font-bold text-[25px]">{username} Posts</h1>
          <div className="posts-profile-page grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <PostCart key={post?._id} post={post} />
            ))}
          </div>
        </>
      ) : <h1 className="text-[#181A2A] m-[20px] font-bold text-[25px]">Not posts created yet</h1>}
    </>
  );
}

export default PostsInProfile;
