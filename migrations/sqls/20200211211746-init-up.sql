CREATE TABLE `board` (
  `id` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `short_url` text NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `member` (
  `id` varchar(255) NOT NULL,
  `avatar_url` text,
  `full_name` text NOT NULL,
  `initials` text NOT NULL,
  `username` text NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `card` (
  `id` varchar(255) NOT NULL,
  `date_last_activity` datetime NOT NULL,
  `description` text NOT NULL,
  `name` text NOT NULL,
  `pos` float NOT NULL,
  `short_url` text NOT NULL,
  `board_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `card_board_fk` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `card_member` (
  `card_id` varchar(255) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  PRIMARY KEY (`card_id`,`member_id`),
  CONSTRAINT `card_member_card_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `card_member_member_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `action` (
  `id` varchar(255) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `date` datetime NOT NULL,
  `card_id` varchar(255) NOT NULL,
  `board_id` varchar(255) NOT NULL,
  CONSTRAINT `action_card_FK` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `action_board_FK` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `action_member_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
