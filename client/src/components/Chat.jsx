import React, { useState, useEffect } from 'react';
import Conversation from './Conversation';
import Message from './Message';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/conversations`, {
            withCredentials: true
        });
        setConversations(response.data);
      } catch (error) {
        alert('Error fetching conversations');
      }
    }
    getConversations();
  }, [])

  const openNewConversation = () => {
    setCurrentMessage("");
    setSelectedConversationId(null);
    setMessages([]);
  }


  const handleSend = async () => {
    try {
        setMessages(prevMessages => [...prevMessages, { index: prevMessages.length + 1, content: currentMessage }]);        
        setCurrentMessage("");
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/send_message`, {
            conversation_id: selectedConversationId,
            content: currentMessage,
        }, {
            withCredentials: true
        });
        
        if (selectedConversationId === null) {
            const conversation = response.data.conversation;
            setConversations([conversation, ...conversations]);
            setSelectedConversationId(conversation.uid);
        }
        const message = response.data.message;
        setMessages(prevMessages => [...prevMessages, { index: message.index, content: message.content }]);
        
    } catch (error) {
        alert('Error sending message');
        setMessages(prevMessages => prevMessages.pop());
    }
  }

  const logout = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/logout`, {}, {
            withCredentials: true
        });
        if (response.status === 200) {
            navigate("/");
        } else {
            alert('Error logging out');
        }
    } catch (error) {
        alert('Error logging out');
    }
  }

  const account = async () => {
    navigate("/account");
  }


  return (
    <div className="flex h-screen bg-gray-800">
      <div className="w-1/6 h-full flex flex-col">
        <div className="p-3 bg-gray-900 flex items-center justify-center w-full">
          <button className="px-2 py-1 bg-gray-100 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300" onClick={openNewConversation}>New Conversation</button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-900 items-center justify-center">
          {conversations.map((conversation) => (
            <Conversation key={conversation.uid} uid={conversation.uid} title={conversation.title} selectedConversationId={selectedConversationId} setSelectedConversationId={setSelectedConversationId} setMessages={setMessages}/>
          ))}
        </div>
      </div>
      <div className="w-5/6 h-full flex flex-col">
        <div className="bg-gray-900 flex justify-end items-center py-3 px-5 space-x-5">
            <button onClick={account} className="px-2 py-1 bg-gray-100 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300">My Account</button>
            <button onClick={logout} className="px-2 py-1 bg-gray-100 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300">Log Out</button>
        </div>
        <div className="flex-1 flex-col overflow-y-auto p-5 space-y-4 bg-gray-800">
          {messages && messages.map((message) => (
            <Message key={message.index} index={message.index} content={message.content} />
          ))}
        </div>
        <div className="p-4 bg-gray-800 flex items-center">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white outline-none"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button className="ml-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-bold hover:bg-gray-300" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
