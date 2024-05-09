import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database: ', error);
        return;
    }
    console.log("Successfully connected to the database.");
    const sqlScript = fs.readFileSync('../database/users.sql', {encoding: 'utf-8'});
    connection.query(sqlScript, (err, results) => {
        if(err) {
            console.error('Error executing the SQL script: ', err);
            return;
        }
        console.log('Successfully executed the SQL script: ', results);
    })
});

export default connection;
