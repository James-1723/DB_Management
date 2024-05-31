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
)