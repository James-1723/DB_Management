import { Router } from 'express';
import db from '../config/db.js';

const router = Router();
router.post('/post', (req, res) => {

    const { title, content } = req.body;

    // Insert data into `post` first
    const postQuery = 'INSERT INTO post (title, text) VALUES (?, ?)';
    db.query(postQuery, [title, content])

    module.exports = router;
})