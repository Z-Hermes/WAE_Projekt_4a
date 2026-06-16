import pool from '$lib/server/database';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {

	// Create a new image post
	create: async ({ request, locals }) => {

		// Only logged-in users can create posts
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		// Read submitted form data
		const formData = await request.formData();

		const image_url = formData.get('image_url');
		const description = formData.get('description');

		// Basic validation
		if (!image_url) {
			return fail(400, {
				error: 'Image URL is required'
			});
		}

		// Save image to database
		await pool.execute(
			`
			INSERT INTO images
			(
				image_url,
				description,
				author_id
			)
			VALUES (?, ?, ?)
			`,
			[
				image_url,
				description,
				locals.user.id
			]
		);

		// Return to dashboard
		throw redirect(303, '/admin');
	}
};