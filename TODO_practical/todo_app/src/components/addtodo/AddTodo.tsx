import React, { useCallback, useEffect, useState } from 'react'
import { ITask } from '../interface';
import Todolist from '../todolist/Todolist';
import Cookies from 'js-cookie'

import './addtodo.css'
import { toast } from 'react-hot-toast';


const AddTodo = () => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [task, setTask] = useState<ITask[]>(() => {
        const availableTask = Cookies.get("todoTasks");
        return availableTask ? JSON.parse(availableTask) : [];
    });

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const eventHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            if (inputValue.length === 0) {
                toast.error("Please Enter a task")
            } else {
                const newTask: ITask = {
                    title: inputValue.trim(),
                    status: false
                }
                const newTaskList: ITask[] = [...task, newTask];
                setTask(newTaskList)
                toast.success("Task added successfully!!!")
                setInputValue('')
            }
        }
    }

    const handleEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setShowInput(false)
            setInputValue('')
        }
    }, [])

    useEffect(() => {
        Cookies.set("todoTasks", JSON.stringify(task), { expires: 1 })
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [task, handleEscape])

    return (
        <>
            <Todolist taskList={task} setTask={setTask} />
            <div className='addSection'>
                {showInput ? (
                    <div className='inputSection my-3 w-100 gx-2 text-center'>
                        <input type="text" className='w-75 inputBox' placeholder='Enter a task' value={inputValue} onChange={handleInputChange} onKeyDown={eventHandler} autoFocus />
                        {/* <button className='cancelBtn' onClick={closeInput}>X</button> */}
                    </div>
                ) : (
                    <div className="buttonSec position-sticky  w-100 d-flex justify-content-center">
                        <button className='addBtn' onClick={handleButtonClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddTodo