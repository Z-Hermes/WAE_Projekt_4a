import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { createsession, hashPassword } from '$lib/server/auth';

export const actions = {

	// Register a new user
	register: async ({ request, cookies }) => {

		// Read form data
		const form = await request.formData();

		const username = form.get('username');
		const password = form.get('password');

		// Check required fields
		if (!username || !password) {
			return fail(400, {
				username,
				error: 'Please fill all fields'
			});
		}

		let result;

		try {

			// Create user
			[result] = await pool.execute(
				`
				INSERT INTO users
				(username, password)
				VALUES (?, ?)
				`,
				[
					username,
					await hashPassword(password)
				]
			);

		} catch (err) {

			console.error(err);

			// Username already exists
			if (err.code === 'ER_DUP_ENTRY') {
				return fail(400, {
					username,
					error: 'Username already exists'
				});
			}

			return fail(500, {
				error: 'Registration failed'
			});
		}

		// Automatically log user in
		const sessionId = await createsession(
			result.insertId
		);

		cookies.set('session', sessionId, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		// Redirect to profile
		throw redirect(
			303,
			'/profile/' + username
		);
	}
};