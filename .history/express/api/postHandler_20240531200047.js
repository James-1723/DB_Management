import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.get('/post', (req, res) => {

    const userId = req.params.userId;

    // Acquired every post
    const postQuery = `
        SELECT post.post_id, post.title AS post_title, post.text AS post_content
        FROM post
        WHERE post.user_id = ?
    `;

    db.query(postQuery, [userId], (err, postResults) => {
        if (err) {
            console.error('Error fetching posts: ', err);
            res.status(500).send('Server error');
            return;
        }

        // Dealing with tags 
        const postIds = postResults.map(post => post.post_id);
        if (postIds.length === 0) {
            res.json({ posts: [] });
            return;
        }

        const tagQuery = `
            SELECT pt.post_id, t.tag_name
            FROM post_tag pt
            JOIN tag t ON pt.tag_id = t.tag_id
            WHERE pt.post_id IN (?)
        `;

        db.query(tagQuery, [postIds], (err, tagResults) => {
            if (err) {
                console.error('Error fetching posts: ', err);
                res.status(500).send('Server error');
                return;
            }

            // Combining tags into post
            const posts = postResults.map(post => {
                return {
                    post_id: post.post_id,
                    post_title: post.post_title,
                    post_content: post.post_content,
                    post_tags: tagResults
                        .filter(tag => tag.post_id === post.post_id)
                        .map(tag => tag.tag_name)
                };
            }); 

            res.json({ posts });
        });
    })

});

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
