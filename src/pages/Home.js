import React, { useContext } from 'react';
import Feed from '../components/Feed';
import PostContext from '../context/PostContext';

const Home = () => {
  const { posts } = useContext(PostContext);

  return (
    <main className='Home'>
      {posts.length ? <Feed posts={posts} /> : <p style={{ marginTop: '3rem' }}>No posts to display</p>}
    </main>
  );
};

export default Home;
