import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "node_crud_api"
})
console.log("Database is Connected")

export default pool;