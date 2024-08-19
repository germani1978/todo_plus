import { Router } from 'express'
import {
    addTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
} from '../controllers/taskController.js'

const router = Router()

//get tasks
router.get('/', getTasks)

//get task
router.get('/:id', getTask)

//add task
router.post('/', addTask)

//update task
router.put('/:id', updateTask)

//del task
router.delete('/:id', deleteTask)

export default router
