import pool from '$lib/server/database.js';

// Load homepage data
export async function load() {

	// Latest 25 posts
	const [posts] = await pool.execute(
		`
		SELECT
			images.*,
			users.username
		FROM images
		JOIN users
		ON users.id = images.author_id
		ORDER BY created_at DESC
		LIMIT 25
		`
	);

	// Top 3 most voted posts
	const [topPosts] = await pool.execute(
		`
		SELECT
			images.*,
			users.username
		FROM images
		JOIN users
		ON users.id = images.author_id
		ORDER BY votes DESC
		LIMIT 3
		`
	);

	return {
		posts,
		topPosts
	};
}