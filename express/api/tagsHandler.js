import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.get('/tags', (req, res) => {

    const tags = [
        { tag_id: 1, tag_name: 'tag1' },
        { tag_id: 2, tag_name: 'tag2' },
    ];

    if(tags.length > 0 ) {
        res.json({
            success: true,
            message: '標籤讀取成功',
            tags: tags
        })
    } else {
        res.json({
            success: false,
            message: '未找到標籤資料',
        });
    }
}); 

export default router;