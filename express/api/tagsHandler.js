import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.get('/tags', (req, res) => {

    const query = 'SELECT tag_id, tag_name FROM tag';

    db.query(query, (err, results) => {

        if (err) {
            console.error('Error fetching tags: ', err);
            res.status(500).send('Server error');
            return;
        }

        if (results.length > 0) {
            res.json({
                success: true,
                message: 'Successfully reading tags',
                tags: results
            });
        } else {
            res.json({
                success: false,
                message: 'Failed to find data of tags',
            });
        }
    });
}); 
export default router;