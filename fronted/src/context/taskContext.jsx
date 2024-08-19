import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask
} from '../services/taskService'

export const TaskContext = createContext()

const TaskProvider = ({ children }) => {
    //almacena las tareas
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTasks()
                setTasks(data)
            } catch (error) {
                setError(error.message)
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    //agrega una tarea
    const addNewTask = async newTask => {
        try {
            const taskAux = await addTask(newTask)
            setTasks(prevTasks => [...prevTasks, taskAux])
        } catch (error) {
            setError(error)
        }
    }

    //update task
    const updateNewTask = async (id, task) => {
        try {
            await updateTask(id, task)
            setTasks(prevTasks =>
                prevTasks.map(taskAux => (taskAux.id === id ? task : taskAux))
            )
        } catch (error) {
            setError(error.message)
        }
    }

    //remueve una tarea
    const removeTask = async taskId => {
        try {
            await deleteTask(taskId)
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                addNewTask,
                removeTask,
                updateNewTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default TaskProvider
