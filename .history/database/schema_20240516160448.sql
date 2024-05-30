CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS  `type` (
  `type_ID` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) NOT NULL,
  PRIMARY KEY (`type_ID`)
);

CREATE TABLE IF NOT EXISTS `cooker` (
  `cooker_ID` int NOT NULL AUTO_INCREMENT,
  `cooker_name` varchar(45) NOT NULL,
  PRIMARY KEY (`cooker_ID`)
);

CREATE TABLE IF NOT EXISTS `image` (
  `image_ID` int NOT NULL AUTO_INCREMENT,
  `image` blob,
  PRIMARY KEY (`image_ID`)
);

CREATE TABLE  IF NOT EXISTS `ingredient` (
  `ingre_ID` int NOT NULL AUTO_INCREMENT,
  `ingre_name` varchar(45) NOT NULL,
  PRIMARY KEY (`ingre_ID`)
);

CREATE TABLE IF NOT EXISTS  `post` (
  `post_ID` int NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `share_tag` int DEFAULT NULL,
  `like_tag` int DEFAULT NULL,
  `comment_tag` int DEFAULT NULL,
  `image_ID` int DEFAULT NULL,
  `type_ID` int NOT NULL,
  `ingre_ID` int NOT NULL,
  `cooker_ID` int NOT NULL,
  PRIMARY KEY (`post_ID`),
  KEY `cooker_ID_idx` (`cooker_ID`),
  KEY `ingre_ID_idx` (`ingre_ID`),
  KEY `type_ID_idx` (`type_ID`),
  KEY `image_ID_idx` (`image_ID`),
  CONSTRAINT `cooker_ID` FOREIGN KEY (`cooker_ID`) REFERENCES `cooker` (`cooker_ID`),
  CONSTRAINT `image_ID` FOREIGN KEY (`image_ID`) REFERENCES `image` (`image_ID`),
  CONSTRAINT `ingre_ID` FOREIGN KEY (`ingre_ID`) REFERENCES `ingredient` (`ingre_ID`),
  CONSTRAINT `type_ID` FOREIGN KEY (`type_ID`) REFERENCES `type` (`type_ID`)
);

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_ID` int NOT NULL AUTO_INCREMENT,
  `post_ID` int NOT NULL,
  `comment_text` varchar(45) NOT NULL,
  PRIMARY KEY (`comment_ID`),
  KEY `post_ID_idx` (`post_ID`),
  CONSTRAINT `post_ID` FOREIGN KEY (`post_ID`) REFERENCES `post` (`post_ID`)
);

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
);

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
);

CREATE TABLE IF NOT EXISTS `manager` (
  `manager_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`manager_ID`)
);

CREATE TABLE IF NOT EXISTS `test_post` (
  `post_ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` varchar(90) NOT NULL,
  `value`  int NOT NULL,
  `label` varchar(10) NOT NULL
  PRIMARY KEY (`post_ID`)
)