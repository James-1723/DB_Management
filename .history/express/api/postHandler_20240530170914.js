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
            return new Promise((resolve, reject => {
                db.query(tagQuery, [tag.tag_name, tag.tag_type], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.insertId);
                    }
                });
            }));
        });

        // Waiting for all tags being inserted into table
        Promise.all(tagPromises)
            .then(tagIds => {
                // 在 post 資料中更新 tag ID
                const updatePostQuery = 'UPDATE post SET share_tag = ?, like_tag = ?, comment_tag = ? WHERE post_id = ?';
                db.query(updatePostQuery, [tagIds[0], tagIds[1], tagIds[2], postId], (err, results) => {
                    if (err) {
                        console.error('Error updating post with tags: ', err);
                        res.status(500).send('Server error');
                        return;
                    }
                    res.status(201).send('Post created');
                });
            })
            .catch(err => {
                console.error('Error inserting tags: ', err);
                res.status(500).send('Server error');
            });
    });
});
module.exports = router;