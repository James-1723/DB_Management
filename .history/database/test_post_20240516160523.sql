CREATE TABLE IF NOT EXISTS `test_post` (
  `post_ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` varchar(90) NOT NULL,
  `value`  int NOT NULL,
  `label` varchar(10) NOT NULL
  PRIMARY KEY (`post_ID`)
);