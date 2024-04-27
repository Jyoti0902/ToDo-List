import React from 'react'
import { deleteOne, updateTodoByPatch, updateTodoByPut } from '../APIs/endpoints';

const Tasks = ({ item, render, setRender, updateDetails ,index }) => {
    //task complete btn handle
    const showCompleteButton = async (taskId) => {
        await updateTodoByPatch({ taskCompleted: false }, taskId);
        setRender(!render);
    }
    //delete by id
    const handleDelete = async (taskid) => {
        try {
            await deleteOne(taskid);
            setRender(!render);
        } catch (error) {
            console.log(error, "Delete API error!")
        }
    }
    //update task api
    const handleUpdate = async (taskId) => {
        try {
            const res = await updateTodoByPut(updateDetails, taskId);
            console.log(res.data)
        } catch (error) {
            console.log(error, "Update task api error!");
        }
    }
    return (
        <>
            <div className="task-container">
                <div className='task-details'>
                    <div className='title-detail'><h2 className={item.taskCompleted ? "todo-title" : "todo-title1"}>Title : {item.title} {index}</h2></div>
                    <div className='title-detail'><h2 className={item.taskCompleted ? "todo-title" : "todo-title1"}>Description : {item.description}</h2></div>
                </div>
                <div className='task-btns'>
                    {item.taskCompleted && <button className='complete-btn' onClick={() => showCompleteButton(item._id)}>Complete</button>}
                    <button className='delete-btn' onClick={() => handleDelete(item._id)}>Delete</button>
                    <button className='edit-btn' >Edit</button>
                </div>
            </div>
        </>
    )
}

export default Tasks