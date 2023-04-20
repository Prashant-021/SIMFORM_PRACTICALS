import React from 'react'

import './todolist.css'
import { ITask } from '../interface'
interface ITodoListProps {
    taskList: ITask[];
    setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Todolist: React.FC<ITodoListProps> = (props) => {

    const toggleText = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newList = [...props.taskList]
        newList[index].status = newList[index].status ? false : true;
        props.setTask(newList)
    };
    
    

    return (
        <div className='row gy-2 my-2 listContainer'>
            {props.taskList.map((todo: ITask, index: number) => (
                <div key={index} className="col-12 todo d-flex align-items-center justify-content-between">
                    <p className= {todo.status?"titleText text-muted": "titleText text-dark"}>{todo.title}</p>
                    <input type="checkbox" onChange={(event) => { toggleText(event, index) }} className='checkBox' checked={todo.status} />
                </div>)
            )}
        </div>
    )

}

export default Todolist
