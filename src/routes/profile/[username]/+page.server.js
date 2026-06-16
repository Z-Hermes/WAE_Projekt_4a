import pool from '$lib/server/database';

export async function load({ params }) {

	const [users] = await pool.execute(
		'SELECT * FROM users WHERE username=?',
		[params.username]
	);

	const [posts] = await pool.execute(
		'SELECT * FROM images WHERE author_id=? order by created_at desc',
		[users[0].id]
	);

	return {
		user: users[0],
		posts
	};
}