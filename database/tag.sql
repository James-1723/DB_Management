CREATE TABLE IF NOT EXISTS  `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  `tag_type` enum('ingredient','cooker','type') NOT NULL,
  PRIMARY KEY (`tag_id`),
)