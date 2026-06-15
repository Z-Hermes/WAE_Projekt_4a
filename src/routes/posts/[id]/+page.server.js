import pool from '$lib/server/database.js';
import { error, fail } from '@sveltejs/kit';

// Load one image + all its comments
export async function load({ params }) {
	const [images] = await pool.execute(
		`SELECT i.id, i.image_url, i.description, i.votes, i.created_at, i.author_id, u.username
		 FROM images i
		 LEFT JOIN users u ON i.author_id = u.id
		 WHERE i.id = ?`,
		[params.id]
	);
	if (images.length === 0) error(404, 'Image not found');

	const [comments] = await pool.execute(
		`SELECT c.id, c.text, c.created_at, u.username
		 FROM comments c
		 JOIN users u ON c.user_id = u.id
		 WHERE c.image_id = ?
		 ORDER BY c.created_at ASC`,
		[params.id]
	);

	return { post: images[0], comments };
}

export const actions = {
	// Upvote +1. After the action the load() above runs again,
	// so the new vote count is shown automatically.
	upvote: async ({ params }) => {
		await pool.execute('UPDATE images SET votes = votes + 1 WHERE id = ?', [params.id]);
		return { success: true };
	},

	// Add a comment (only logged-in users)
	comment: async ({ request, params, locals }) => {
		if (!locals.user) return fail(401, { error: 'Please log in to comment' });

		const data = await request.formData();
		const text = data.get('text')?.toString().trim();
		if (!text) return fail(400, { error: 'Comment cannot be empty' });

		await pool.execute('INSERT INTO comments (image_id, user_id, text) VALUES (?, ?, ?)', [
			params.id,
			locals.user.id,
			text
		]);
		return { success: true };
	}
};
