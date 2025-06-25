-- Insert Genres
INSERT INTO genres (id, name, description) VALUES
(1, 'Science Fiction', 'Imaginative and futuristic concepts'),
(2, 'Mystery', 'Puzzling and suspenseful narratives'),
(3, 'Romance', 'Stories focused on romantic relationships'),
(4, 'Historical Fiction', 'Fictional stories set in the past'),
(5, 'Fantasy', 'Magical and supernatural elements'),
(6, 'Thriller', 'Characterized by suspense, excitement, and anticipation'),
(7, 'Horror', 'Intended to frighten, scare, or disgust'),
(8, 'Classic Literature', 'Works considered to be of high artistic merit, timeless, and influential'),
(9, 'Dystopian', 'Exploration of social and political structures in a dark, nightmare world');

-- Insert Authors
INSERT INTO authors (id, first_name, last_name, bio) VALUES
(1, 'John', 'Smith', 'Prolific science fiction author known for space operas'),
(2, 'Emily', 'Johnson', 'Mystery novelist with a knack for complex plots'),
(3, 'Michael', 'Brown', 'Versatile writer exploring various genres'),
(4, 'Sarah', 'Davis', 'Romantic storyteller with a flair for historical settings'),
(5, 'David', 'Wilson', 'Fantasy world-builder with a rich imagination'),
(6, 'Jennifer', 'Lee', 'Collaborative author specializing in multi-genre works'),
(7, 'Robert', 'Taylor', 'Historical fiction expert with meticulous research skills'),
(8, 'Laura', 'Anderson', 'Up-and-coming author known for genre-blending narratives'),
(9, 'George', 'Orwell', 'English novelist, essayist, journalist and critic, known for allegorical novella Animal Farm and dystopian novel Nineteen Eighty-Four.'),
(10, 'Jane', 'Austen', 'English novelist known primarily for her six major novels, which interpret, critique and comment upon the British gentry at the end of the 18th century.'),
(11, 'Stephen', 'King', 'American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Dubbed the "King of Horror".'),
(12, 'J.R.R.', 'Tolkien', 'English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.'),
(13, 'Agatha', 'Christie', 'English writer known for her 66 detective novels and 14 short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple.'),
(14, 'Isaac', 'Asimov', 'American writer and professor of biochemistry at Boston University. He was known for his works of science fiction and popular science.'),
(15, 'J.K.', 'Rowling', 'British author and philanthropist. She is best known for writing the Harry Potter series, which has won multiple awards and sold more than 500 million copies.'),
(16, 'Neil', 'Gaiman', 'English author of short fiction, novels, comic books, graphic novels, nonfiction, audio theatre, and films. His works include The Sandman, American Gods, and Coraline.'),
(17, 'Margaret', 'Atwood', 'Canadian poet, novelist, literary critic, essayist, teacher, environmental activist, and inventor. Known for The Handmaid''s Tale.'),
(18, 'Frank', 'Herbert', 'American science-fiction author best known for the 1965 novel Dune and its five sequels.'),
(19, 'Dan', 'Brown', 'American author best known for his thriller novels, including the Robert Langdon stories Angels & Demons, The Da Vinci Code, and Inferno.'),
(20, 'Mary', 'Shelley', 'English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus (1818).'),
(21, 'Terry', 'Pratchett', 'English humorist, satirist, and author of fantasy novels, especially comical works. He is best known for his Discworld series.');

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
(25, 'The Time Capsule', '2023-08-15', 'A message from the future sets off a chain of events that could prevent a global catastrophe.', 1),
(26, 'Nineteen Eighty-Four', '1949-06-08', 'In a totalitarian superstate, a man dares to think for himself, an act of rebellion that could cost him his life.', 9),
(27, 'Pride and Prejudice', '1813-01-28', 'The spirited Elizabeth Bennet faces mounting pressure from her parents to marry, leading to a clash with the proud Mr. Darcy.', 8),
(28, 'It', '1986-09-15', 'Seven children in a small town are terrorized by an evil entity that preys on their deepest fears, forcing them to confront it again as adults.', 7),
(29, 'The Hobbit', '1937-09-21', 'A comfortable hobbit''s life is turned upside down when he joins a group of dwarves on a quest to reclaim their treasure from a dragon.', 5),
(30, 'Murder on the Orient Express', '1934-01-01', 'Just after midnight, a snowdrift stops the Orient Express in its tracks. By morning, an American tycoon lies dead in his compartment, and detective Hercule Poirot must find the killer.', 2),
(31, 'Foundation', '1951-06-01', 'A psycho-historian who can predict the future creates a foundation to preserve knowledge ahead of an impending galactic dark age.', 1),
(32, 'Harry Potter and the Sorcerer''s Stone', '1997-06-26', 'An orphaned boy discovers he is a wizard and is invited to attend a magical school, where he uncovers the truth about his parents'' deaths.', 5),
(33, 'American Gods', '2001-06-19', 'A recently released ex-convict named Shadow meets a mysterious man who calls himself "Wednesday" and who knows more than he first seems to about Shadow''s life and past.', 5),
(34, 'The Handmaid''s Tale', '1985-02-17', 'In a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.', 9),
(35, 'Dune', '1965-08-01', 'The son of a noble family is entrusted with the protection of the most valuable asset and most vital element in the galaxy.', 1),
(36, 'The Da Vinci Code', '2003-03-18', 'A murder inside the Louvre and clues in Da Vinci paintings lead to the discovery of a religious mystery protected by a secret society for two thousand years.', 6),
(37, 'Frankenstein', '1818-01-01', 'A young scientist creates a sapient creature in an unorthodox scientific experiment, leading to a tragic confrontation.', 8),
(38, 'Animal Farm', '1945-08-17', 'A group of farm animals rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.', 8),
(39, 'The Shining', '1977-01-28', 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings.', 7),
(40, 'The Lord of the Rings', '1954-07-29', 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', 5),
(41, 'And Then There Were None', '1939-11-06', 'Ten strangers are lured to an isolated island and are killed off one by one. They work together to determine who the killer is before it''s too late.', 2),
(42, 'I, Robot', '1950-12-02', 'A collection of short stories about the developing relationship between humans, robots, and morality, governed by the Three Laws of Robotics.', 1),
(43, 'Neverwhere', '1996-09-16', 'A young London businessman stops to help a bleeding girl and finds himself in a bizarre, magical realm underneath the city, inhabited by monsters and angels.', 5),
(44, 'Oryx and Crake', '2003-05-06', 'A man struggles to survive in a post-apocalyptic world, reflecting on the events and the friend that led to the planet''s destruction.', 9),
(45, 'The Silmarillion', '1977-09-15', 'A collection of mythopoeic works that describe the universe of Eä, in which are found the lands of Valinor, Beleriand, Númenor, and Middle-earth.', 5),
(46, 'Angels & Demons', '2000-05-01', 'A Harvard symbologist is called to a Swiss research facility to analyze a cryptic symbol seared into the chest of a murdered physicist.', 6),
(47, 'The Stand', '1978-10-03', 'After a deadly plague wipes out most of the world''s population, the remaining survivors are drawn to two figures, one representing good and the other evil, for a final confrontation.', 7),
(48, 'Sense and Sensibility', '1811-10-30', 'Two sisters, one pragmatic and one romantic, navigate the complexities of love, heartbreak, and societal expectations in 19th-century England.', 8),
(49, 'The A.B.C. Murders', '1936-01-06', 'Hercule Poirot receives taunting letters from a serial killer who seems to be choosing victims alphabetically. Poirot must solve the pattern before the killer strikes again.', 2),
(50, 'Good Omens', '1990-05-01', 'An angel and a demon who have grown fond of Earth team up to prevent the coming of the Antichrist and the end of the world.', 5);


-- Insert Book Authors (many-to-many relationship)
INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 1),
(6, 2), (7, 3), (8, 4), (9, 5), (10, 1),
(11, 2), (12, 4), (13, 7), (14, 5), (15, 3),
(16, 2), (17, 6), (18, 7), (19, 5), (20, 1),
(21, 8), (22, 4), (23, 7), (24, 5), (25, 6),
(3, 6), (7, 1), (12, 8), (17, 3), (25, 3),
(26, 9), (27, 10), (28, 11), (29, 12), (30, 13),
(31, 14), (32, 15), (33, 16), (34, 17), (35, 18),
(36, 19), (37, 20), (38, 9), (39, 11), (40, 12),
(41, 13), (42, 14), (43, 16), (44, 17), (45, 12),
(46, 19), (47, 11), (48, 10), (49, 13), (50, 16),
(50, 21); 

INSERT INTO roles (id, name) VALUES
(1, 'user'),
(2, 'admin');

INSERT INTO users (id, username, password, role_id) VALUES
(1, "admin", "$2b$10$aJ.VGK8wOF/w0NhPohWeduMeav2a8UB11Hz4quyF.zwTnMHtYwQaK", 2);