DROP DATABASE IF EXISTS flashcards;

CREATE DATABASE flashcards;

USE flashcards;
		
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` MEDIUMTEXT NULL DEFAULT NULL,
  `password` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
		
CREATE TABLE `decks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `deckname` MEDIUMTEXT NULL DEFAULT NULL,
  `score` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
		
CREATE TABLE `cards` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `card_front` MEDIUMTEXT NULL DEFAULT NULL,
  `card_back` MEDIUMTEXT NULL DEFAULT NULL,
  `deck_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);
		
-- CREATE TABLE `deck_cards` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `deck_id` INTEGER NULL DEFAULT NULL,
--   `card_id` INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );
		
CREATE TABLE `user_decks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `deck_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `cards` ADD FOREIGN KEY (deck_id) REFERENCES `decks` (`id`);
ALTER TABLE `user_decks` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `user_decks` ADD FOREIGN KEY (deck_id) REFERENCES `decks` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `decks` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `cards` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `deck_cards` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user_decks` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO `users` (`username`,`password`) VALUES
('mike','1234');

-- Insert decks
INSERT INTO `decks` (`deckname`,`score`) VALUES
('deck1','40');
INSERT INTO `decks` (`deckname`,`score`) VALUES
('secondDeck','80');

-- Insert cards
INSERT INTO `cards` (`card_front`,`card_back`, `deck_id`) VALUES
('What is your name?','Batman', '1');
INSERT INTO `cards` (`card_front`,`card_back`, `deck_id`) VALUES
('Another card?','Yep', '1');
INSERT INTO `cards` (`card_front`,`card_back`, `deck_id`) VALUES
('One more for deck...?', 'one', '1');
INSERT INTO `cards` (`card_front`,`card_back`, `deck_id`) VALUES
('Second deck?', 'sure', '2');

-- User_decks
INSERT INTO `user_decks` (`user_id`,`deck_id`) VALUES
('1','1');