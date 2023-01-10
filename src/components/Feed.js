import React from 'react';
import Post from './Post';

const Feed = props => {
  const { posts } = props;
  return (
    <>
      {posts.map(post => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
};

export default Feed;
