import React from 'react'
import { useState, useEffect } from 'react'

import { CreateTask, GetAllTasks, DeleteTaskById, UpdateTaskById } from './api';
const Taskmanager = () => {
    const [Input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [Search, setSearch] = useState('')
    const [updateTask, setupdateTask] = useState(null)
    
    const handleTask=()=>{
        if(updateTask && Input){
            console.log('UpdateApi...');
            handleUpdateItem();
        }else if(updateTask==null && Input){
            console.log('CreateApi..');
            
            handleAddTask();
        }
    }

   useEffect(() => {
    if (updateTask) {
        setInput(updateTask.taskName);
    }
}, [updateTask]);
    
    
    
    const inputHandle = (e) => {
        setInput(e.target.value);
        console.log(e.target.value);
    }

    const searchHandle = (e) => {
        setSearch(e.target.value)
    }

    const fetchAllTasks = async () => {
        try {
            const data = await GetAllTasks();

            setTasks(data);
            console.log(tasks)
        }
        catch (e) {
            console.error(e);
        }
    }
    console.log(tasks);
    useEffect(() => {
        fetchAllTasks()
    }, [])

    const handleAddTask = async () => {

        const taskObj = {
            taskName: Input,
            isDone: false
        }
        console.log(taskObj)

        try {
            const data = await CreateTask(taskObj);
            console.log(data);
            setInput('');
            fetchAllTasks();
        }

        catch (e) {
            console.error(e);
        }

    }

    const handleUpdateItem=async(item)=>{
                const { _id,isDone } = updateTask;
        const obj = {
            taskName : Input,
            isDone: !isDone
        }
        try {
            const data = await UpdateTaskById(_id, obj);


            fetchAllTasks();
        }
        catch (e) {
            console.error(e);
        }
    }



    const handleTaskDelete = async (id) => {
        try {
            const data = await DeleteTaskById(id);


            fetchAllTasks();
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleCheck = async (item) => {
        const { _id, taskName, isDone } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const data = await UpdateTaskById(_id, obj);


            fetchAllTasks();
        }
        catch (e) {
            console.error(e);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-10">
            <div>
                <h1 className='text-3xl font-bold text-gray-800'>Task Manager App</h1>
            </div>
            <div className='flex gap-3'>
                <div className='flex gap-1'>
                    <input
                        value={Input}
                        onChange={inputHandle}
                        className='border border-gray-300  rounded-l py-1 px-4 focus:outline-none ' type="text" placeholder="Enter a task" />
                    <button
                        onClick={handleTask}
                        className="bg-green-600 rounded-r px-2 py-1 cursor-pointer hover:bg-green-600">
                        <i className="ri-add-line text-3xl text-white"></i>
                    </button>
                </div>
                <div className='flex'>
                    <button className="bg-gray-200 rounded-l cursor-pointer px-2 py-1">
                        <i className="ri-search-line font-bold text-2xl px-2 py-1"></i>
                    </button>

                    <input
                        value={Search}
                        onChange={searchHandle}
                        className='border border-gray-300  rounded-r py-2 px-4 focus:outline-none ' type="text" placeholder="Search a task" />
                </div>
            </div>
            {tasks.map((item) => (

                <div className='flex bg-gray-150 cursor-pointer border border-gray-300 rounded w-100 p-2 justify-between'>
                    <span className={item.isDone ? 'line-through' : ''}>{item.taskName}</span>
                    <div className='flex gap-1 ml-auto'>
                        <button onClick={() => handleCheck(item)} className='bg-green-600 px-2 py-1 font-semibold rounded cursor-pointer text-white'> <i className="ri-check-line "></i></button>
                        <button onClick={()=>setupdateTask(item)} className='bg-blue-700 px-2 py-1 font-semibold rounded cursor-pointer text-white'>  <i className="ri-pencil-line "></i></button>

                        <button onClick={() => handleTaskDelete(item._id)} className='bg-red-500 px-2 font-semibold py-1 cursor-pointer rounded text-white'><i className="ri-delete-bin-6-line "></i></button>
                    </div>


                </div>
            ))}

        </div>
    )
}

export default Taskmanager
