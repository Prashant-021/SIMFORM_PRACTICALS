import React, { forwardRef } from 'react'

import './todolist.css'
import { ITask } from '../interface'
import { toast } from 'react-hot-toast';




interface ITodoListProps {
    taskList: ITask[];
    setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Todolist = forwardRef<HTMLDivElement, ITodoListProps>((props, ref) => {


    const toggleStatus = (index: number) => {
        const newList = [...props.taskList]
        newList[index].status = newList[index].status ? false : true;
        if (newList[index].status === true) {
            toast('Good Job! Task Completed', {
                icon: '👏',
            });
        }
        props.setTask(newList)
    };

    function deleteTask(index: number) {
        const newList = [...props.taskList]
        newList.splice(index, 1)
        props.setTask(newList)
        toast('Task Deleted');
    }

    console.log(props.taskList.length, "size")
    return (
        <div className='row gy-2 my-2 listContainer'>
            {props.taskList.length === 0 ? <div className='h-100 d-flex flex-column justify-content-center align-items-center'><h4 className='mb-3'> No tasks to show</h4><img src='/Notasks.jpg' alt="empty" width="200" height="auto" /></div> :
                props.taskList.map((todo: ITask, index: number) => (
                    <div key={index} ref={ref} className=" todo col-12 d-flex align-items-center justify-content-between">
                        <div className='breakWords text-justify'>
                            <p className={todo.status ? "titleText text-muted" : "titleText text-dark "}>{todo.title}</p>
                        </div>
                        <div className="buttons d-flex align-items-center">
                            <button className='btn' onClick={() => deleteTask(index)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg></button>
                            <input type="checkbox" onChange={(event) => { toggleStatus(index) }} className='checkBox' checked={todo.status} />
                        </div>
                    </div>)
                )}
        </div>
    )
}
)
export default Todolist
