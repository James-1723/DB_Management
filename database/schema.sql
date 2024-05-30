CREATE TABLE IF NOT EXISTS user (
    `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
);

CREATE TABLE IF NOT EXISTS  `post` (
    `post_id` int NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  `tag_type` enum('ingredient','cooker','type') NOT NULL,
  PRIMARY KEY (`post_id`,`tag_name`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
);

CREATE TABLE IF NOT EXISTS `report` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `repCom_id` int NOT NULL,
  `manager_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `post_ID_idx` (`post_id`),
  KEY `comment_ID_idx` (`repCom_id`),
  KEY `manager_id_idx` (`manager_id`),
  CONSTRAINT `comment_ID` FOREIGN KEY (`repCom_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `manager_id` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`),
  CONSTRAINT `po_post_ID` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `user_user_ID` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE IF NOT EXISTS  `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `share_tag` int DEFAULT NULL,
  `like_tag` int DEFAULT NULL,
  `comment_tag` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `image_ID_idx` (`image_id`),
  CONSTRAINT `image_ID` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) 
CREATE TABLE IF NOT EXISTS `manager` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,