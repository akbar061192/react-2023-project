import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostContext from '../context/PostContext';

const SinglePost = () => {
  const { posts, handleDeletePost } = useContext(PostContext);
  const { id } = useParams();

  const post = posts.find(post => post.id === +id);

  return (
    <main className='PostPage'>
      <article className='post'>
        {post ? (
          <>
            <h1>{post.title}</h1>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
            <Link to={`/editPost/${post.id}`}>
              <button style={{ marginLeft: '1rem', background: 'gray' }}>Edit Post</button>
            </Link>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>
              <Link to='/'>Vist our Home Page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default SinglePost;
