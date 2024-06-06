import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-800 space-y-2'>
      <h1 className="text-2xl font-bold mb-8 text-white">Welcome to ...</h1>
      <Link to="/login">
        <Button text="Login" onClick={() => {}} />
      </Link>
      <Link to="/register">
        <Button text="Register" onClick={() => {}} />
      </Link>
    </div>
  );
};

export default Home;
