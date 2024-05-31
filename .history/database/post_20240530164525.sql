CREATE TABLE IF NOT EXISTS  `post` (
  `title` varchar(200) NOT NULL,
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