import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { createsession, hashPassword } from '$lib/server/auth';

export const actions = {

	// Handle registration form submission
	register: async ({ request, cookies }) => {

		// Read submitted form data
		const form = await request.formData();

		const username = form.get('username');
		const password = form.get('password');

		// Make sure all fields are filled
		if (!username || !password) {
			return fail(400, {
				username,
				error: 'Please fill all fields'
			});
		}

		let result;

		try {

			// Create new user with hashed password
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

			// Any other database error
			return fail(500, {
				error: 'Registration failed'
			});
		}

		// Create session for newly registered user
		const sessionId = await createsession(
			result.insertId
		);

		// Save session cookie
		cookies.set('session', sessionId, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		// Redirect to dashboard
		throw redirect(303, '/profile/' + username);
	}
};