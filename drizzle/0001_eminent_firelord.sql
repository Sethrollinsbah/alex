CREATE TABLE `lead` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`data` text,
	`source` text NOT NULL,
	`status` text NOT NULL
);
