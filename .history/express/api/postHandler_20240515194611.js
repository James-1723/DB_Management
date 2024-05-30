import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.post('/post', (req, res) => {
    // 註冊用戶的邏輯
    const { user_name, user_email, user_password } = req.body;
    const query = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)';
    db.query(query, [user_name, user_email, user_password], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).json({success: false, message: "註冊過程中，伺服器錯誤" });
            return;
        } else {
            res.json({ success: true, message: "註冊成功" });
        }
    })
});