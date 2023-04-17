import React from 'react'
import Todo from '../todo/Todo'

import './todolist.css'


function Todolist() {
    const todoList: string[] = ['Buy new Sweatshirt', 'Begin promotional phase', 'Begin promotional phase', 'Read an article', "Watch 'Sherlock'", 'Begin QA for the product', 'Go for a walk']
    return (
        <div className='row gy-2 my-2 listContainer'>
            {todoList.map((todo: string, index: number) => 
                <Todo key={index} title={todo} index= {index}/>
            )}
        </div>
    )
}

export default Todolist
