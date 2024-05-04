import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    // password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(error => {
    if (error) {
        console.log(process.env.DB_HOST);
        throw error;
    }
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD)
    console.log("Successfully connected to the database.");
});

export default connection;
