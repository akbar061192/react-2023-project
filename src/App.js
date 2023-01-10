import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import About from './pages/About';
import SinglePost from './pages/SinglePost';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import EditPost from './pages/EditPost';

const App = () => {
  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/newPost' element={<NewPost />} />
        <Route path='/post/:id' element={<SinglePost />} />
        <Route path='/about' element={<About />} />
        <Route path='/editPost/:id' element={<EditPost />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
