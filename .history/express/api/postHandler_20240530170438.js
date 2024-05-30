import { Router } from 'express';
import db from '../config/db.js';

const router = Router();
router.post('/post', (req, res) => {

    const { title, content, selectedTags } = req.body;

    // Insert data into `post`
    const postQuery = 'INSERT INTO post (title, text) VALUES (?, ?)';
    db.query(postQuery, [title, content], (err, results) => {

        if (err) {
            console.error('Error inserting post: ', err);
            res.status(500).send('Server error');
            return;
        }

        // Acquired the ID of new-insert post
        const postId = results.insertId;

        // Insert data into `tag`
        const tagQuery = 'INSERT INTO tag (tag_name, tag_type) VALUES (?, ?)';
        const tagPromises = selectedTags.map(tag => {
            return new Promises((resolve, reject => {
                db.query(tagQuery, [tag.tag_name, tag.tag_type], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.insertId);
                    }
                })
            }))
        })

    });
    module.exports = router;
});