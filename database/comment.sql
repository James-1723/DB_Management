CREATE TABLE IF NOT EXISTS `comment` (
  `comment_ID` int NOT NULL AUTO_INCREMENT,
  `post_ID` int NOT NULL,
  `comment_text` varchar(45) NOT NULL,
  PRIMARY KEY (`comment_ID`),
  KEY `post_ID_idx` (`post_ID`),
  CONSTRAINT `post_ID` FOREIGN KEY (`post_ID`) REFERENCES `post` (`post_ID`)
)