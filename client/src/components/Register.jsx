import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from './Input';
import Button from './Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const navigate = useNavigate();

  const handleSumbit = async (event) => {
    event.preventDefault();

    if(password !== repeatedPassword) {
        alert("Passwords must match.");
        return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
        email,
        password,
        repeatedPassword,
      }, {
        withCredentials: true
      });
      // Handle successful response
      navigate("/chat");
    } catch (error) {
      // Handle error response
      alert('Error registering');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-800'>
      <h1 className="text-2xl font-bold mb-8 text-white">Register</h1>
      <form className='flex flex-col flex-col items-center justify-center space-y-2 w-1/4' onSubmit={handleSumbit}>
        <Input type="email" placeholder="Email" value={email} setValue={setEmail} />
        <Input type="password" placeholder="Password" value={password} setValue={setPassword} />
        <Input type="password" placeholder="Repeat Password" value={repeatedPassword} setValue={setRepeatedPassword} />
        <Button type="submit" text="Register" />
      </form>
    </div>
  );
};

export default Register;
