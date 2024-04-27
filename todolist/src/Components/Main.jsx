import React, { useEffect, useState } from 'react'
import '../AllCSS/Main.css'
import { createTodo, deleteAll, getTasks, updateTodoByPut } from '../APIs/endpoints';
import Tasks from './Tasks';

const Main = () => {
  const [allposts, setAllPosts] = useState({
    title: "",
    description: ""
  });
  const [tasks, setTasks] = useState([]);
  const [render, setRender] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({})
  const [update, setUpdate] = useState(false);
  // const [editTrue, setEditTrue] = useState(false);
  //create todo API
  const handleAddTodo = async () => {
    try {
      await createTodo(allposts);
      setAllPosts({
        title: "",
        description: ""
      })
      setRender(!render);
    } catch (error) {
      console.log(error, "handleAddTodo button error!")
    }
  }
  //get todos
  const handleGetTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.allTasks);
      console.log(res.data.allTasks);
      setUpdateDetails(res.data.allTasks);
    } catch (error) {
      console.log(error, "Get API error!")

    }
  }
  //delete all tasks
  const handleDelAll = async () => {
    try {
      await deleteAll();
      setRender(!render);
    } catch (error) {
      console.log("Delete all api error!")
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
  useEffect(() => {
    handleGetTasks();
  }, [render])
  // useEffect(() => {
  //   handleUpdate();
  // }, [editTrue])
  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <h2 className='todo-title'>My Todos</h2>

          {/* <div className="input-fields">

            <div className="title">
              <label className='todo-title'>TTILE : </label>
              <input placeholder='Title' value={updateDetails.title} ></input>
              <label className='todo-title'>DESCRIPTION : </label>
              <input placeholder='Description' value={updateDetails.description} ></input>
            </div>
            <div className='addtask'><button className='update-btn'>Update</button></div>
          </div> */}

          <div className="input-fields">
            <div className="title">
              <label className='todo-title'>TTILE : </label>
              <input placeholder='Title' value={allposts.title} onChange={(e) => setAllPosts({ ...allposts, title: e.target.value })}></input>
              <label className='todo-title'>DESCRIPTION : </label>
              <input placeholder='Description' value={allposts.description} onChange={(e) => setAllPosts({ ...allposts, description: e.target.value })}></input>
            </div>
            <div className='addtask'><button className='update-btn' onClick={() => handleAddTodo()}>Add todo</button></div>
          </div>


          <div>
            {
              tasks?.length ? tasks.map((item, index) => {
                return (
                  <>
                    <Tasks item={item} index={index} render={render} setRender={setRender} updateDetails={updateDetails} update={update} />
                  </>
                )
              })
                : <div className='delall'><span style={{ color: 'white', fontSize: 30 }}>No tasks to do</span></div>}
          </div>
          {
            tasks?.length ? <div className='delall'><button className='delete-btn' onClick={() => handleDelAll()}>Delete All</button></div> : null}
        </div>
      </div >
    </>
  )
}

export default Main