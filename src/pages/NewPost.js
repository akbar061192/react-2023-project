import React, { useContext } from 'react';
import PostContext from '../context/PostContext';

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } = useContext(PostContext);

  return (
    <main className='NewPost'>
      <h1> New Post </h1>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          required
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
        />
        <label htmlFor='body'>Body</label>
        <textarea id='body' required value={postBody} onChange={e => setPostBody(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
