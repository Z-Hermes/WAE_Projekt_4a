import pool from '$lib/server/database';
import { error } from '@sveltejs/kit';

// Load a user's public profile
export async function load({ params }) {

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
		posts
	};
}