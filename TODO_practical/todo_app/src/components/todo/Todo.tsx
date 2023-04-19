import React, { useState } from 'react'

import './todo.css'
interface task {
    title: string,
    status: boolean
}
type Props = {
    task: task
}

const Todo = (props: Props) => {
    const [color, setColor] = useState<string>('black')
    const toggleText: React.MouseEventHandler<HTMLInputElement> = () => {
        (color === 'black') ? setColor('grey') : setColor('black');
    }
    
    return (
        <div className="col-12 todo d-flex align-items-center justify-content-between">
            <p className='titleText' style={{ color: color }}>{props.task.title}</p>
            <input type="checkbox" onClick={toggleText} className='checkBox' />
        </div>
    )
}

export default Todo