import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.post('/post', async (req, res) => {
    const { title, content, selectedTags, selectImage } = req.body;

    try {
        // 插入圖片並獲取 imgId
        const imgResults = await db.promise().query('INSERT INTO image (image) VALUES (?)', [selectImage]);
        const imgId = imgResults[0].insertId;

        // 插入貼文
        const postResults = await db.promise().query('INSERT INTO post (title, content, image_id) VALUES (?, ?, ?)', [title, content, imgId]);
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
