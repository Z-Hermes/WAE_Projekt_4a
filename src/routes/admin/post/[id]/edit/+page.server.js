import pool from '$lib/server/database.js';
import { uploadImage } from '$lib/server/blob.js';
import { error, redirect, fail } from '@sveltejs/kit';

// Load the image for editing (only the owner or an admin may open this)
export async function load({ params, locals }) {
	if (!locals.user) redirect(302, '/login');

	const [rows] = await pool.execute('SELECT * FROM images WHERE id = ?', [params.id]);

	if (rows.length === 0) error(404, 'Post not found');

	// Only allow the owner or an admin to edit
	if (rows[0].author_id !== locals.user.id && locals.user.role !== 'admin') {
		error(403, 'Not authorized');
	}

	return { post: rows[0] };
}

// Make sure the current user is allowed to touch this post
async function checkOwner(id, locals) {
	const [rows] = await pool.execute('SELECT author_id FROM images WHERE id = ?', [id]);
	if (rows.length === 0) return false;
	return rows[0].author_id === locals.user.id || locals.user.role === 'admin';
}

export const actions = {
	// Update the caption, and optionally replace the image with a new upload
	edit: async ({ request, params, locals }) => {
		if (!locals.user) return fail(401, { error: 'Not authenticated' });
		if (!(await checkOwner(params.id, locals))) return fail(403, { error: 'Not authorized' });

		const formData = await request.formData();
		const file = formData.get('image');
		const description = formData.get('description')?.toString().trim();

		// A new image is optional: only upload if the user actually picked a file
		if (file && typeof file !== 'string' && file.size > 0) {
			let image_url;
			try {
				image_url = await uploadImage(file);
			} catch (err) {
				return fail(400, { error: err.message });
			}
			await pool.execute('UPDATE images SET image_url = ?, description = ? WHERE id = ?', [
				image_url,
				description || null,
				params.id
			]);
		} else {
			// No new image: just update the caption
			await pool.execute('UPDATE images SET description = ? WHERE id = ?', [
				description || null,
				params.id
			]);
		}

		redirect(303, `/post/${params.id}`);
	},

	// Delete the post (owner or admin only)
	delete: async ({ params, locals }) => {
		if (!locals.user) return fail(401, { error: 'Not authenticated' });
		if (!(await checkOwner(params.id, locals))) return fail(403, { error: 'Not authorized' });

		await pool.execute('DELETE FROM images WHERE id = ?', [params.id]);
		redirect(303, `/user/${locals.user.username}`);
	}
};
