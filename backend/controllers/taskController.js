import connection from '../db.js'

const getTasks = (req, res) => {
    const query = 'SELECT * FROM tasks'

    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.json(result)
    })
}

const getTask = (req, res) => {
    const id = req.params.id

    const query = 'SELECT * FROM tasks WHERE id=?'

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({})
        }

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }

        return res.status(201).json(results[0])
    })
}

const addTask = (req, res) => {
    const { text, todo } = req.body

    const query = 'INSERT INTO tasks (text,todo) VALUES (?,?)'

    connection.query(query, [text, todo], (err, results) => {
        if (err) {
            return res.status(400).json({ err: err.message })
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ msg: 'Tarea no agregada' })
        }

        res.status(201).json({ id: results.insertId, text, todo })
    })
}

const updateTask = (req, res) => {
    const id = req.params.id
    const { text, todo } = req.body

    if (text === undefined && todo === undefined) {
        return res.status(400).json({ msg: 'Error en los datos' })
    }

    let query = 'UPDATE tasks SET text=?, todo=? WHERE id=?;'
    let columns = [text, todo, id]

    if (text === undefined || text === '') {
        query = 'UPDATE tasks SET todo=? WHERE id=?;'
        columns = [todo, id]
    }

    if (todo === undefined) {
        query = 'UPDATE tasks SET text=? WHERE id=?;'
        columns = [text, id]
    }

    connection.query(query, columns, (err, results) => {
        if (err) {
            return res.status(400).json({ err: err.message })
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }

        return res.status(201).json({ msg: 'Tarea actualizada' })
    })
}

const deleteTask = (req, res) => {
    const id = req.params.id

    const query = 'DELETE FROM tasks WHERE id = ?;'

    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ err: err.message })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }

        res.status(201).json({ msg: 'Tarea terminada' })
    })
}

export { getTask, getTasks, addTask, updateTask, deleteTask }
