import React from 'react';
import axios from 'axios';

const Conversation = (props) => {

    const handleClick = async () => {
        console.log(props)
        props.setSelectedConversationId(props.uid);
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/get_messages/${props.uid}`, {
            withCredentials: true
        });
        props.setMessages(response.data.messages.map((message) => {
            return {
                index: message.index,
                content: message.content,
            }
        }));
    }

    return (
        <div className='flex flex-col'>
            <button onClick={handleClick} className={`place-self-center w-11/12 text-white font-bold rounded-lg px-4 py-1.5 hover:bg-gray-600 ${props.uid === props.selectedConversationId ? "bg-gray-700 outline outline-1 outline-white" : ""}`}>{props.title}</button>
        </div>
    )
}

export default Conversation;

