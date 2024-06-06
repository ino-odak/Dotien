import React from 'react';

const Button = (props) => {
    return (
        <button onClick={props.onClick} className='text-white text-xl font-bold border border-2 border-white rounded px-4 py-1.5 hover:bg-gray-600'>{props.text}</button>
    )
}

export default Button;

