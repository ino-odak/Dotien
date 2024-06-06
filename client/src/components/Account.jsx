import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
    const [message, setMessage] = useState(null);
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get_user`, {
                    withCredentials: true
                });

                const user = response.data;
                setMessage(null);
                setUid(user.uid);
                setEmail(user.email);
                setPassword(user.password);
            } catch (error) {
                console.log("tu tu tu neko te zove!!!")
                setMessage("No user logged in - STATUS 401");
                setUid('');
                setEmail('');
                setPassword('');
            }
        }
        getUserData();
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-800'>
            {message ? <p className='text-xl text-white text-bold'>{message}</p> : 
            <><p className='text-xl text-white text-bold'>User ID: {uid}</p>
            <p className='text-xl text-white text-bold'>Email: {email}</p>
            <p className='text-xl text-white text-bold'>Hashed Password: {password}</p></>}
        </div>
    )
}

export default Account;

