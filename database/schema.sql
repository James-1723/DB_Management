CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image` longblob,
  PRIMARY KEY (`image_id`)
);

CREATE TABLE IF NOT EXISTS  `post` (
  `title` varchar(225) NOT NULL,
  `post_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(200) DEFAULT NULL,
  `share_tag` int DEFAULT NULL,
  `like_tag` int DEFAULT NULL,
  `comment_tag` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `image_ID_idx` (`image_id`),
  CONSTRAINT `image_ID` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
);

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `comment_text` varchar(45) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `post_ID_idx` (`post_id`),
  CONSTRAINT `post_ID` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
);


CREATE TABLE IF NOT EXISTS `manager` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`manager_id`)
);

CREATE TABLE IF NOT EXISTS  `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  `tag_type` enum('ingredient','cooker','type') NOT NULL,
  PRIMARY KEY (`tag_id`)
);

CREATE TABLE IF NOT EXISTS `interaction` (
  `post_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `is_shared` tinyint NOT NULL,
  `sharer_id` int DEFAULT NULL,
  `is_saved` tinyint NOT NULL,
  `saver_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_ID_idx` (`user_id`),
  CONSTRAINT `post_post_ID` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `user_ID` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
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

CREATE TABLE IF NOT EXISTS  `post_tag` (
    `post_id` int NOT NULL,
    `tag_id` int NOT NULL,
    PRIMARY KEY (`post_id`,`tag_id`),
    CONSTRAINT `post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
    CONSTRAINT `tag_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
)