import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
    // 登入用戶的邏輯
    const { user_email, user_password } = req.body;
    const query = `SELECT * FROM users WHERE user_email = ?`
    db.query(query, [user_email], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).json({success: false, message: "登入過程中，伺服器錯誤"});
            return;
        }

        if (result.length === 0) {
            res.status(401).json({success: false, message: "找不到此電子郵件用戶"});
        } else {
            const user = result[0];
            if(user.user_password === user_password) {
                const user_object = {
                    user_name: user.user_name,
                    user_email: user.user_email
                }
                res.json({ success: true, message: "登入成功", user: user_object})
            } else {
                res.status(401).json({ success: false, message: "密碼錯誤"});
            }
        }
    })
});

export default router;