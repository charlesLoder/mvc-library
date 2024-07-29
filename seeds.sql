-- Insert Genres
INSERT INTO genres (id, name, description) VALUES
(1, 'Science Fiction', 'Imaginative and futuristic concepts'),
(2, 'Mystery', 'Puzzling and suspenseful narratives'),
(3, 'Romance', 'Stories focused on romantic relationships'),
(4, 'Historical Fiction', 'Fictional stories set in the past'),
(5, 'Fantasy', 'Magical and supernatural elements');

-- Insert Authors
INSERT INTO authors (id, first_name, last_name, bio) VALUES
(1, 'John', 'Smith', 'Prolific science fiction author known for space operas'),
(2, 'Emily', 'Johnson', 'Mystery novelist with a knack for complex plots'),
(3, 'Michael', 'Brown', 'Versatile writer exploring various genres'),
(4, 'Sarah', 'Davis', 'Romantic storyteller with a flair for historical settings'),
(5, 'David', 'Wilson', 'Fantasy world-builder with a rich imagination'),
(6, 'Jennifer', 'Lee', 'Collaborative author specializing in multi-genre works'),
(7, 'Robert', 'Taylor', 'Historical fiction expert with meticulous research skills'),
(8, 'Laura', 'Anderson', 'Up-and-coming author known for genre-blending narratives');

-- Insert Books
INSERT INTO books (id, title, pubdate, description, genre_id) VALUES
(1, 'Stellar Odyssey', '2023-05-15', 'A space explorer uncovers an ancient alien artifact that could change humanity''s future.', 1),
(2, 'The Enigma Code', '2022-11-30', 'A brilliant detective races against time to crack a series of cryptic murders.', 2),
(3, 'Love in the Time of Dragons', '2023-02-14', 'A forbidden romance blossoms between a knight and a dragon shapeshifter.', 3),
(4, 'Echoes of Eternity', '2023-07-01', 'Two souls find each other across different historical eras.', 4),
(5, 'The Quantum Thief', '2022-09-20', 'A master criminal plans the ultimate heist in a world of advanced quantum technology.', 1),
(6, 'Whispers in the Shadows', '2023-03-10', 'A paranormal investigator confronts her own past while solving a ghostly mystery.', 2),
(7, 'Starbound Hearts', '2022-12-05', 'An interstellar romance between a human colonist and an alien diplomat.', 3),
(8, 'The Alchemist''s Legacy', '2023-06-18', 'A modern-day historian uncovers an ancient alchemical secret that could change the world.', 4),
(9, 'Realms of Magic', '2023-01-25', 'A young mage discovers her true potential in a world divided by magical factions.', 5),
(10, 'The Clockwork Conspiracy', '2022-10-12', 'A steampunk adventure unveiling a plot to overthrow the government with mechanical monstrosities.', 1),
(11, 'Silent Witness', '2023-04-05', 'A cold case detective reopens an unsolved murder with unexpected consequences.', 2),
(12, 'Threads of Destiny', '2022-08-30', 'Three generations of women navigate love and loss in a tapestry of interconnected stories.', 3),
(13, 'The Viking''s Heart', '2023-05-20', 'A fierce Viking warrior falls for a Celtic priestess during a raid on the British Isles.', 4),
(14, 'Dragons of the Frost', '2022-11-15', 'An epic tale of ice dragons and the humans who dare to bond with them.', 5),
(15, 'Neon Nights', '2023-02-28', 'A cyberpunk thriller set in a dystopian megacity where reality and virtual worlds collide.', 1),
(16, 'The Poison Pen', '2022-07-10', 'A series of murders at a writers'' retreat forces the guests to unmask the killer among them.', 2),
(17, 'Across the Stars', '2023-09-01', 'A long-distance relationship spanning galaxies tests the limits of love and technology.', 3),
(18, 'The Samurai''s Song', '2022-12-20', 'A tale of honor, duty, and forbidden love in feudal Japan.', 4),
(19, 'Shadows of Power', '2023-03-15', 'Political intrigue and dark magic intertwine in a fantasy kingdom on the brink of war.', 5),
(20, 'Quantum Entanglement', '2022-10-05', 'A mind-bending exploration of parallel universes and the nature of reality.', 1),
(21, 'The Forgotten Room', '2023-06-30', 'An antique dealer stumbles upon a hidden room that holds the key to a century-old mystery.', 2),
(22, 'Moonlit Melodies', '2022-09-10', 'A struggling musician finds inspiration and romance in a small coastal town.', 3),
(23, 'The Pharaoh''s Curse', '2023-01-10', 'An archaeologist races to break an ancient Egyptian curse before it claims more victims.', 4),
(24, 'Wizards of the Waste', '2022-11-01', 'A group of misfit magicians must save their world from an encroaching magical desert.', 5),
(25, 'The Time Capsule', '2023-08-15', 'A message from the future sets off a chain of events that could prevent a global catastrophe.', 1);

-- Insert Book Authors
INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 1),
(6, 2), (7, 3), (8, 4), (9, 5), (10, 1),
(11, 2), (12, 4), (13, 7), (14, 5), (15, 3),
(16, 2), (17, 6), (18, 7), (19, 5), (20, 1),
(21, 8), (22, 4), (23, 7), (24, 5), (25, 6),
(3, 6), (7, 1), (12, 8), (17, 3), (25, 3);