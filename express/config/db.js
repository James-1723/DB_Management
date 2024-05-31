import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database: ', error);
        console.log(process.env.DB_HOST);
        return;
    }
    console.log("Successfully connected to the database.");
    const sqlScript = fs.readFileSync('../database/schema.sql', {encoding: 'utf-8'});
    connection.query(sqlScript, (err, results) => {
        if(err) {
            console.error('Error executing the SQL script: ', err);
            return;
        }
    })
});

export default connection;
