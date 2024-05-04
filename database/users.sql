CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('test_user', 'test@example.com', 'test_password');