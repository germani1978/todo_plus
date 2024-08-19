const API_URL = 'http://localhost:3000' // Cambia esto a tu URL de backend

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/`)
    if (!response.ok) {
        throw new Error('Error obteniendo las tareas')
    }
    return await response.json()
}

export const getTask = async id => {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
        throw new Error('Error obteniendo la tarea')
    }
    return await response.json()
}

export const addTask = async task => {
    const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    if (!response.ok) {
        throw new Error('Error agregando la tarea')
    }
    return await response.json()
}

export const updateTask = async (id, updatedTask) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    })
    if (!response.ok) {
        throw new Error('Error actualizando la tarea')
    }
    return await response.json()
}

export const deleteTask = async id => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error('Error eliminando la tarea')
    }
    return await response.json()
}
