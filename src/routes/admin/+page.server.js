import pool from '$lib/server/database';

export async function load({ locals }) {

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