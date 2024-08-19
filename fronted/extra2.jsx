/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask
} from '../services/taskService'

const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext)

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks()
                setTasks(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    const addNewTask = async task => {
        try {
            const newTask = await addTask(task)
            setTasks(prevTasks => [...prevTasks, newTask])
        } catch (err) {
            setError(err.message)
        }
    }

    const updateExistingTask = async (id, updatedTask) => {
        try {
            const updated = await updateTask(id, updatedTask)
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === id ? updated : task))
            )
        } catch (err) {
            setError(err.message)
        }
    }

    const deleteExistingTask = async id => {
        try {
            await deleteTask(id)
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                addNewTask,
                updateExistingTask,
                deleteExistingTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
