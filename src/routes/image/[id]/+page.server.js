import pool from '$lib/server/database';

// Load image details and comments
export async function load({ params }) {

	// Get image and author information
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

	// Image not found
	if (images.length === 0) {
		return {
			post: null,
			comments: []
		};
	}

	// Get all comments for this image
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

	// Create a new comment
	comment: async ({ request, locals, params }) => {

		// Only logged-in users can comment
		if (!locals.user) {
			return;
		}

		const formData = await request.formData();

		const text = formData.get('text');

		// Prevent empty comments
		if (!text || text.trim() === '') {
			return;
		}

		await pool.execute(
			`
			INSERT INTO comments
			(image_id, user_id, text)
			VALUES (?, ?, ?)
			`,
			[
				params.id,
				locals.user.id,
				text
			]
		);
	},

	// Upvote an image once per user
	vote: async ({ locals, params }) => {

		// Only logged-in users can vote
		if (!locals.user) {
			return;
		}

		// Check if user already voted
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

		// Prevent duplicate votes
		if (existing.length > 0) {
			return;
		}

		// Save vote record
		await pool.execute(
			`
			INSERT INTO image_votes
			VALUES (?, ?)
			`,
			[
				locals.user.id,
				params.id
			]
		);

		// Increase vote count
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