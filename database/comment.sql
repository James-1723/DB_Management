CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `comment_text` varchar(45) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `post_ID_idx` (`post_id`),
  CONSTRAINT `post_ID` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
)