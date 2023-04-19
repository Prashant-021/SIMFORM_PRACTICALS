import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import './todolist.css'
import Todo from '../todo/Todo'
import { useState } from 'react'

interface Itask {
    title: string,
    status: boolean
}


function Todolist() {
    // let avaliableTasksList
    // if (typeof avaliableTasks === 'undefined') {
    //     avaliableTasksList = []
    // } else {
    //     avaliableTasksList = JSON.parse(avaliableTasks)
    // }

    const [displayTask, setDisplayTasks] = useState<Itask[]>([])
    useEffect(() => {
        setTimeout(() => {
            const avaliableTasks = Cookies.get('todoTasks')
            if (typeof avaliableTasks !== 'undefined')
                setDisplayTasks(JSON.parse(avaliableTasks))
        }, 500);
    }, [displayTask])

    return (
        <div className='row gy-2 my-2 listContainer'>
            {displayTask.map((todo: Itask, index: React.Key | null | undefined) => <Todo key={index} task = {todo} />)}
        </div>
    )
}

export default Todolist
