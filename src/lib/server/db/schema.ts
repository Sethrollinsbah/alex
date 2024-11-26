import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const lead = sqliteTable('lead', {
	id: text('id').primaryKey(),
	createdAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	data: text('data', { mode: 'json' }),
	source: text('source').notNull(),
	status: text('status').notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Lead = typeof lead.$inferSelect;
