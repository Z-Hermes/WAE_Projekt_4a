import pool from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

// Load all posts created by the currently logged-in user
export async function load({ locals }) {

	// Prevent guests from accessing dashboard
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// Get user's images ordered from newest to oldest
	const [posts] = await pool.execute(
		`
		SELECT *
		FROM images
		WHERE author_id = ?
		ORDER BY created_at DESC
		`,
		[locals.user.id]
	);

	return {
		posts
	};
}