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
)