import { Router, query } from 'express';
import db from '../config/db.js';

const router = Router();

router.get('search', (req, res) => {

    const keyword = req.query.query;

    // Search post with keyword in DB
    const searchQuery = `
        SELECT p.post_id, p.title AS post_title, p.content AS post_content
        FROM post p
        WHERE p.title = ?
    `;

    db.query(searchQuery, [query], (err, searchResults) => {
        if (err) {
            console.error('Error searching posts: ', err);
            res.status(500).send('Server error');
            return;
        }

    });
});

router.get('/posts', (req, res) => {

    const userId = req.query.userId;

    // Acquired every post
    const postQuery = `
        SELECT post.post_id, post.title AS post_title, post.content AS post_content
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

            res.status(200).json({ success: true, posts, message: 'Posts fetched' });
        });
    })

});

router.post('/post', async (req, res) => {
    const { title, content, selectedTags, selectImage, user_id } = req.body;

    try {
        // 插入圖片並獲取 imgId
        const imgResults = await db.promise().query('INSERT INTO image (image) VALUES (?)', [selectImage]);
        const imgId = imgResults[0].insertId;

        // 插入貼文
        const postResults = await db.promise().query('INSERT INTO post (title, content, user_id, image_id) VALUES (?, ?, ?, ?)', [title, content, user_id, imgId]);
        const postId = postResults[0].insertId;

        // 插入標籤
        await Promise.all(selectedTags.map(tag => {
            return db.promise().query('INSERT INTO post_tag (post_id, tag_id) VALUES (?, ?)', [postId, tag.value]);
        }));

        res.status(201).json({ success: true, message: 'Post created' });
    } catch (err) {
        console.error('Error during post creation: ', err);
        res.status(500).json({ success: false, message: 'Error during post creation' });
    }
});

export default router;
