import React from 'react';

const Message = (props) => {
    return (
        <div className='flex flex-col'>
            <p className={`text-white rounded-md text-start ${props.index % 2 === 1 ? "place-self-end bg-gray-600 px-4 py-1.5" : "place-self-start"}`}>{props.content}</p>
        </div>
    )
}

export default Message;