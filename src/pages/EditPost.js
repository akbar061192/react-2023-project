import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostContext from '../context/PostContext';

const EditPost = () => {
  const { posts, handleEditPost, editTitle, setEditTitle, editBody, setEditBody } = useContext(PostContext);
  const { id } = useParams();
  const post = posts.find(post => post.id === +id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className='NewPost'>
      <h1>Edit Post</h1>
      {post ? (
        <form className='newPostForm' onSubmit={e => e.preventDefault()}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            required
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <label htmlFor='body'>Body</label>
          <textarea id='body' required value={editBody} onChange={e => setEditBody(e.target.value)} />
          <button type='submit' onClick={() => handleEditPost(post.id)}>
            Edit
          </button>
        </form>
      ) : (
        <>
          <h2>Post Not Found</h2>
          <p>
            <Link to='/'>Vist our Home Page</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
