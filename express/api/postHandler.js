import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.post('/post', (req, res) => {
    const { title, content, selectedTags } = req.body;

    const postQuery = 'INSERT INTO post (title, content) VALUES (?, ?)';
    db.query(postQuery, [title, content], (err, results) => {
        if (err) {
            console.error('Error inserting post: ', err);
            res.status(500).send('Server error');
            return;
        }

        // 獲取自動生成的post_id
        const postId = results.insertId;

        // 為每個標籤建立關聯
        const tagQuery = 'INSERT INTO post_tag (post_id, tag_id) VALUES (?, ?)';
        const tagPromises = selectedTags.map(tag => new Promise((resolve, reject) => {
            db.query(tagQuery, [postId, tag.value], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }));

        Promise.all(tagPromises)
            .then(() => {
                res.status(201).send('Post created with tags');
            })
            .catch(err => {
                console.error('Error inserting tags: ', err);
                res.status(500).send('Server error');
            });
    });
});

export default router;
