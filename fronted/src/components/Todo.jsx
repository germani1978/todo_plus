import PropTypes from 'prop-types'
import './Todo.css'
import { useContext } from 'react'
import { TaskContext } from '../context/taskContext'
import { opositive, verdadero } from '../utils/bool'

//show una tarea
const Todo = ({ task }) => {
    const { removeTask, updateNewTask } = useContext(TaskContext)

    const handleRemove = async () => {
        try {
            await removeTask(task.id)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChecked = async () => {
        try {
            await updateNewTask(task.id, {
                ...task,
                todo: opositive(task.todo)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="todo">
            {/* mostrar la tarea y si se ha realizado */}
            <div className="head">
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={verdadero(task.todo)}
                    onChange={handleChecked}
                />
                <div className="text">{task.text}</div>
            </div>

            {/* boton para eliminar la tarea */}
            <button onClick={handleRemove}>X</button>
        </div>
    )
}

Todo.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        todo: PropTypes.number.isRequired
    }).isRequired
}

export default Todo
