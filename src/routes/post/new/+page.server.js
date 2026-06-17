import pool from '$lib/server/database';
import { redirect, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const actions = {

	// Create a new image post
	create: async ({ request, locals }) => {

		// Only logged-in users can create posts
		if (!locals.user) {
			throw redirect(303, '/login');
		}

        const filter_name =
	formData.get('filter_name');

		// Read submitted form data
		const formData = await request.formData();

		const image = formData.get('image');
const description = formData.get('description');

		// Basic validation
		if (!image) {
			return fail(400, {
				error: 'Image is required'
			});
		}

        // Upload image to Vercel Blob
const uploadedBlob = await put(
	image.name,
	image,
	{
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN
	}
);

// Save blob URL
const image_url = uploadedBlob.url;

		// Save image to database
		await pool.execute(
			`
		INSERT INTO images
(
	image_url,
	description,
	filter_name,
	author_id
)
VALUES (?, ?, ?, ?)
			`,
			[
				image_url,
				description,
				filter_name,
				locals.user.id
			]
		);

		// Redirect user to their profile after uploading the post
throw redirect(
	303,
	'/profile/' + locals.user.username
);
	}
};