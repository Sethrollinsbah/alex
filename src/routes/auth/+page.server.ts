import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/cms');
	}
	return { user: event.locals.user, form: await superValidate(zod(formSchema)) };
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		if (!event.platform) {
			return;
		}

		const db = await event.platform.DB;
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const results = await db.select().from(table.user).where(eq(table.user.username, username));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const validPassword = await auth.verifyPassword(existingUser.passwordHash, password);
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id, db);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/demo/lucia');
	},
	register: async (event) => {
		console.log('start');
		const formData = await event.request.formData();

		if (!event.platform) {
			return;
		}

		const db = await event.platform.DB;
		const username = formData.get('username');
		const password = formData.get('password');

		// Validate input
		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		try {
			// Check if user already exists
			const existingUser = await db.query(table.user).filter({ username }).first();
			if (existingUser) {
				return fail(409, { message: 'Username already exists' });
			}

			const userId = generateUserId();
			const passwordHash = await auth.hashPassword(password);

			await db.insert(table.user).values({ id: userId, username, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId, db);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

			return {
				success: true,
				message: 'User registered successfully!'
			};
		} catch (error) {
			console.error('Error registering user:', error);
			return fail(500, { message: 'An error occurred while registering the user' });
		}
	},

	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		if (!event.platform) {
			return fail(401);
		}
		const db = event.platform.DB;
		await auth.invalidateSession(event.locals.session.id, db);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/demo/lucia/login');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
