import React from 'react';

const Input = (props) => {
    return (
        <input
          className='bg-gray-800 border border-1 border-white rounded outline-none text-white p-2 w-full'
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
    )
}

export default Input;