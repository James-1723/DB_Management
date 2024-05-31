import express from 'express'
import mysql from 'mysql2'
import cors from './middleware/cors.js'
import userRouters from './api/userHandler.js';
import tagsHandler from './api/tagsHandler.js';
import postHandler from './api/postHandler.js';


const app = express()
app.use(express.json());
app.use(cors);

app.use('/api', userRouters);
app.use('/api', tagsHandler);
app.use('/api', postHandler);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});