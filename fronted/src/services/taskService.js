import axios from 'axios'
const API_URL = 'http://localhost:3000/'

export const getTasks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/')
        return response.data
    } catch (error) {
        throw new Error('Error obteniendo las tareas', error.message)
    }
}

export const getTask = async id => {
    try {
        const response = await axios.get(`${API_URL}${id}`)
        return response.data
    } catch (error) {
        throw new Error('Error obteniendo la tarea', error.message)
    }
}

export const addTask = async task => {
    try {
        const response = await axios.post(API_URL, task)
        return response.data
    } catch (error) {
        throw new Error('Error agregando la tarea', error.message)
    }
}

export const deleteTask = async id => {
    try {
        const response = await axios.delete(`${API_URL}${id}`)
        return response.data
    } catch (err) {
        throw new Error('Error eliminando la tarea', err)
    }
}

export const updateTask = async (id, payload) => {
    try {
        await axios.put(`${API_URL}${id}`, payload)
    } catch (error) {
        throw new Error('Error actualizando la tarea', error.message)
    }
}
