CREATE TABLE IF NOT EXISTS `interaction` (
  `post_ID` int NOT NULL,
  `from_user_ID` int DEFAULT NULL,
  `is_shared` tinyint NOT NULL,
  `sharer_ID` int DEFAULT NULL,
  `is_saved` tinyint NOT NULL,
  `saver_ID` int DEFAULT NULL,
  PRIMARY KEY (`post_ID`),
  KEY `user_ID_idx` (`from_user_ID`),
  CONSTRAINT `post_post_ID` FOREIGN KEY (`post_ID`) REFERENCES `post` (`post_ID`),
  CONSTRAINT `user_ID` FOREIGN KEY (`from_user_ID`) REFERENCES `user` (`user_id`)
)