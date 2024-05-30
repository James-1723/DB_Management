import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.get('/tags', (req, res) => {

    const query = 'SELECT tag_id, tag_name FROM tag';

    db.query(query, (err, results) => {
        
    });
    
}); 

export default router;