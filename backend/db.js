import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect(err => {
    if (err) {
        console.log('Error conectado a la base de datos')
    }
    console.log('Conectado a la base de datos')
})

export default connection
