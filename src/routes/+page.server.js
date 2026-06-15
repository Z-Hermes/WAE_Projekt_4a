import pool from '$lib/server/database.js';

export async function load() {
	const [posts] = await pool.execute(`
        SELECT
            images.*,
            users.username
        FROM images
        JOIN users
        ON users.id = images.author_id
        ORDER BY created_at DESC
        LIMIT 25
    `);

	const [topPosts] = await pool.execute(`
        SELECT *
        FROM images
        ORDER BY votes DESC
        LIMIT 3
    `);

	return {
		posts,
		topPosts
	};
}