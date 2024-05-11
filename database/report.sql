CREATE TABLE IF NOT EXISTS `report` (
  `user_ID` int NOT NULL,
  `post_ID` int NOT NULL,
  `repCom_ID` int NOT NULL,
  PRIMARY KEY (`user_ID`,`post_ID`),
  KEY `post_ID_idx` (`post_ID`),
  KEY `comment_ID_idx` (`repCom_ID`),
  CONSTRAINT `comment_ID` FOREIGN KEY (`repCom_ID`) REFERENCES `comment` (`comment_ID`),
  CONSTRAINT `po_post_ID` FOREIGN KEY (`post_ID`) REFERENCES `post` (`post_ID`),
  CONSTRAINT `user_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_id`)
)