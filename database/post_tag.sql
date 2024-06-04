CREATE TABLE IF NOT EXISTS  `post_tag` (
    `post_id` int NOT NULL,
    `tag_id` int NOT NULL,
    PRIMARY KEY (`post_id`,`tag_id`),
    CONSTRAINT `post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
    CONSTRAINT `tag_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
)