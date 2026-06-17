import pool from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';

// Load a user's public profile
export async function load({ params, locals }) {

	// Find user by username
	const [users] = await pool.execute(
		`
		SELECT *
		FROM users
		WHERE username = ?
		`,
		[params.username]
	);

	// User doesn't exist
	if (users.length === 0) {
		throw error(404, 'User not found');
	}

	// Get all posts from this user
	const [posts] = await pool.execute(
		`
		SELECT *
		FROM images
		WHERE author_id = ?
		ORDER BY created_at DESC
		`,
		[users[0].id]
	);

	return {
		user: users[0],
		posts,

		// True when user is viewing their own profile
		isOwnProfile:
			locals.user &&
			locals.user.username === users[0].username//*** */
	};
}

export const actions = {

	// Delete one of your own posts
	delete: async ({ request, locals }) => {

		// Must be logged in
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();

		const id = formData.get('id');

		// Verify post belongs to logged in user
		const [posts] = await pool.execute(
			`
			SELECT *
			FROM images
			WHERE id = ?
			AND author_id = ?
			`,
			[
				id,
				locals.user.id
			]
		);

		// Prevent deleting someone else's post
		if (posts.length === 0) {
			return;
		}

		// Delete post
		await pool.execute(
			`
			DELETE FROM images
			WHERE id = ?
			`,
			[id]
		);
	}
};