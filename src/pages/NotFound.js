import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='Missing'>
      <h2>Post Not Found</h2>
      <p>
        <Link to='/'>Vist our Home Page</Link>
      </p>
    </main>
  );
};

export default NotFound;
