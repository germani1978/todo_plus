/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import './App.css'
import { TaskContext } from './context/taskContext'
import Todo from './components/Todo'

function App() {
    const { tasks, loading, error, addNewTask, removeTask, updateNewTask } =
        useContext(TaskContext)

    const [enter, setEnter] = useState('')

    //agrega una tarea
    const handleAdd = async () => {
        try {
            await addNewTask({ text: enter, todo: 0 })
        } catch (error) {
            console.log(error.message)
        }
        setEnter('')
    }

    return (
        <div className="panel">
            {/* input */}
            <div className="wrap-input">
                <input
                    type="text"
                    placeholder="Write here"
                    value={enter}
                    onChange={e => setEnter(e.target.value)}
                />

                <button onClick={handleAdd}>Add</button>
            </div>

            {/* mostrar lista de tareas       */}
            <div className="list-todo">
                {tasks.map(task => (
                    <Todo key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default App
