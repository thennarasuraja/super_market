import mysql from 'mysql2'


const databaseconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'supermarket'
})

databaseconnection.connect()

export default databaseconnection;