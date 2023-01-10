import { createContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import postsApi from '../api/posts';

const PostContext = createContext({});

export const PostContentProvider = props => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editBody, setEditBody] = useState('');
  const [refreshList, setRefreshList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.get('/posts');
        setPosts(response.data.reverse());
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPosts();
  }, [refreshList]);

  useEffect(() => {
    if (search !== '') {
      const filteredPosts = posts.filter(post => {
        return Object.values(post).some(val =>
          val.toString().toLowerCase().includes(search.toString().toLowerCase())
        );
      });
      setSearchResults(filteredPosts);
    } else {
      setSearchResults(posts);
    }
  }, [search]);

  const handleDeletePost = async id => {
    try {
      await postsApi.delete(`/posts/${id}`);
      navigate('/');
      setRefreshList(prev => !prev);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const maxId = Math.max(...posts.map(post => post.id));
    const newPostId = posts.length ? maxId + 1 : 1;
    const newDateTime = format(new Date(), 'MMMM dd, yyyy pp');

    const newPost = {
      id: newPostId,
      datetime: newDateTime,
      title: postTitle,
      body: postBody,
    };

    try {
      await postsApi.post('/posts', newPost);
      setPostTitle('');
      setPostBody('');
      navigate('/');
      setRefreshList(prev => !prev);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditPost = async id => {
    const newDateTime = format(new Date(), 'MMMM dd, yyyy pp');

    const editPost = {
      id: id,
      datetime: newDateTime,
      title: editTitle,
      body: editBody,
    };

    try {
      await postsApi.put(`/posts/${id}`, editPost);
      setEditTitle('');
      setEditBody('');
      navigate('/');
      setRefreshList(prev => !prev);
    } catch (err) {
      console.log(err.message);
    }
  };

  const finalPosts = searchResults.length || (searchResults.length === 0 && search) ? searchResults : posts;

  return (
    <PostContext.Provider
      value={{
        posts: finalPosts,
        postTitle,
        postBody,
        setPostTitle,
        setPostBody,
        editTitle,
        editBody,
        setEditTitle,
        setEditBody,
        handleSubmit,
        handleEditPost,
        handleDeletePost,
        search,
        setSearch,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
