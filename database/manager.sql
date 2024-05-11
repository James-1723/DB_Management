CREATE TABLE IF NOT EXISTS `manager` (
  `manager_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`manager_ID`)
) 