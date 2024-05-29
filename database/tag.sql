CREATE TABLE IF NOT EXISTS  `post` (
    `post_id` int NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  `tag_type` enum('ingredient','cooker','type') NOT NULL,
  PRIMARY KEY (`post_id`,`tag_name`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
)