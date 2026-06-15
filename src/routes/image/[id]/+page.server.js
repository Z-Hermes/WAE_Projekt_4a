import pool from '$lib/server/database';

export async function load({ params }) {

	const [images] = await pool.execute(
		`
        SELECT images.*, users.username
        FROM images
        JOIN users
        ON users.id = images.author_id
        WHERE images.id = ?
    `,
		[params.id]
	);

	const [comments] = await pool.execute(
		`
        SELECT comments.*, users.username
        FROM comments
        JOIN users
        ON users.id = comments.user_id
        WHERE image_id = ?
        ORDER BY created_at DESC
    `,
		[params.id]
	);

	return {
		post: images[0],
		comments
	};
}

export const actions = {

	comment: async ({ request, locals, params }) => {

		if (!locals.user) return;

		const formData = await request.formData();

		const text = formData.get('text');

		await pool.execute(
			`
            INSERT INTO comments
            (image_id,user_id,text)
            VALUES (?,?,?)
        `,
			[
				params.id,
				locals.user.id,
				text
			]
		);
	},

	vote: async ({ locals, params }) => {

		if (!locals.user) return;

		const [existing] = await pool.execute(
			`
            SELECT *
            FROM image_votes
            WHERE user_id = ?
            AND image_id = ?
        `,
			[
				locals.user.id,
				params.id
			]
		);

		if (existing.length > 0) return;

		await pool.execute(
			`
            INSERT INTO image_votes
            VALUES (?,?)
        `,
			[
				locals.user.id,
				params.id
			]
		);

		await pool.execute(
			`
            UPDATE images
            SET votes = votes + 1
            WHERE id = ?
        `,
			[params.id]
		);
	}
};