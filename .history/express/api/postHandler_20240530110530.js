import { Router } from 'express';
import db from '../config/db.js';

const router = Router();
router.post('/post', (req, res) => {

    // Logic of posting
    const { title, content, selectedTags } = req.body;
    const { share_tag, like_tag, comment_tag } = selectedTags;
    const query = 'INSERT INTO post VALUES(title, content, share_tag, like_tag, comment_tag)'

    db.query(query, [title, text, share_tag, like_tag, comment_tag], (err, results) => {

        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(201).send('Post created');

    });
});

module.exports = router;