import pool from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import { verifyPassword, createsession } from '$lib/server/auth';

export const actions = {

	// Handle login form submission
	login: async ({ request, cookies }) => {

		// Read submitted form data
		const form = await request.formData();

		const username = form.get('username');
		const password = form.get('password');

		// Make sure both fields are filled
		if (!username || !password) {
			return fail(400, {
				username,
				error: 'Invalid username or password'
			});
		}

		// Search user by username
		const [rows] = await pool.execute(
			'SELECT * FROM users WHERE username = ?',
			[username]
		);

		// User does not exist
		if (rows.length === 0) {
			return fail(400, {
				error: 'Username not found'
			});
		}

		// Compare entered password with stored hash
		if (!(await verifyPassword(password, rows[0].password))) {
			return fail(400, {
				error: 'Incorrect password'
			});
		}

		// Create a new login session
		const sessionId = await createsession(rows[0].id);

		// Save session id in browser cookie
		cookies.set('session', sessionId, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		// Redirect to dashboard
		throw redirect(303, '/admin');
	}
};