import React, { useState } from 'react'

import './addtodo.css'


const AddTodo = () => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const closeInput = () => {
        setShowInput(false);
    };

    return (
        <div className='addSection mt-3 mt-xl-4'>
            {showInput ? (
                <div className='inputSection w-100 gx-2 text-center'>
                    <input type="text" className='w-75' value={inputValue} placeholder="Enter your Task" onChange={handleInputChange} autoFocus/>
                    <button className='cancelBtn' onClick={closeInput}>X</button>
                </div>
            ) : (
                <button className='addBtn' onClick={handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default AddTodo