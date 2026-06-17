import pool from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {

	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const [users] = await pool.execute(
		`
		SELECT bio, profile_picture
		FROM users
		WHERE id = ?
		`,
		[locals.user.id]
	);

	return {
		bio: users[0].bio,
		profile_picture: users[0].profile_picture
	};
}

export const actions = {

	save: async ({ request, locals }) => {

		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();

		const bio = formData.get('bio');
		const profilePicture = formData.get('profile_picture');

		let profile_picture_url = null;

		// Upload new image if one was selected
		if (
			profilePicture &&
			profilePicture.size > 0
		) {

			const uploadedBlob = await put(
				profilePicture.name,
				profilePicture,
				{
					access: 'public',
					token: BLOB_READ_WRITE_TOKEN
				}
			);

			profile_picture_url = uploadedBlob.url;
		}

		// If no new image selected keep old one
		if (!profile_picture_url) {

			const [users] = await pool.execute(
				`
				SELECT profile_picture
				FROM users
				WHERE id = ?
				`,
				[locals.user.id]
			);

			profile_picture_url =
				users[0].profile_picture;
		}

		await pool.execute(
			`
			UPDATE users
			SET
				bio = ?,
				profile_picture = ?
			WHERE id = ?
			`,
			[
				bio,
				profile_picture_url,
				locals.user.id
			]
		);

		throw redirect(
			303,
			'/profile/' + locals.user.username
		);
	}
};