CREATE TABLE `authors` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`bio` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `book_authors` (
	`book_id` integer NOT NULL,
	`author_id` integer NOT NULL,
	PRIMARY KEY(`author_id`, `book_id`),
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`pubdate` text NOT NULL,
	`description` text,
	`genre_id` integer,
	FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
