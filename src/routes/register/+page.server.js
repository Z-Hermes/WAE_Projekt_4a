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
		});// fail() -> send a validation error back to the page without crashing.
// redirect() -> send the browser to another URL after success.
import { fail, redirect } from '@sveltejs/kit';
// Our shared MySQL connection pool (reused for every query).
import pool from '$lib/server/database.js';
// createsession() makes a login session row; hashPassword() bcrypt-hashes a password.
import { createsession, hashPassword } from '$lib/server/auth';

export const actions = {

	// "register" matches the form's action="?/register" on the page.
	// It runs ON THE SERVER when the form is submitted.
	register: async ({ request, cookies }) => {

		// Read the submitted form fields (username + password).
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		// Server-side validation: never trust the browser. If anything is
		// missing, return a 400 and refill the username on the page.
		if (!username || !password) {
			return fail(400, {
				username,
				error: 'Please fill all fields'
			});
		}

		// Declared outside the try so we can use it after the block.
		let result;

		try {
			// Insert the new user. The password is hashed with bcrypt FIRST,
			// so the database never stores the real password.
			// The ? placeholders are a prepared statement -> prevents SQL injection.
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
			// Log the real error to the terminal for debugging.
			console.error(err);

			// MySQL throws ER_DUP_ENTRY when a UNIQUE column repeats.
			// Our username column is UNIQUE, so this means it's already taken.
			if (err.code === 'ER_DUP_ENTRY') {
				return fail(400, {
					username,
					error: 'Username already exists'
				});
			}

			// Catch-all for any other DB problem (offline, bad SQL, etc.)
			// IMPORTANT: this return stops the function, so the code below
			// never runs with an undefined `result`.
			return fail(500, {
				error: 'Registration failed'
			});
		}

		// result.insertId is the auto-increment id MySQL gave the new user.
		// We create a session for that user so they're logged in immediately.
		const sessionId = await createsession(result.insertId);

		// Store the session id in a cookie so future requests know who they are.
		// maxAge is in seconds: 60*60*24*30 = 30 days.
		cookies.set('session', sessionId, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		// Registration done + logged in -> send them to their profile page.
		// (303 = "see other": correct status after a POST so refreshing won't resubmit.)
		throw redirect(303, '/profile/' + username);
	}
};

		// Redirect to dashboard
		throw redirect(303, '/profile/' + username);
	}
};