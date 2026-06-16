import pool from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const actions = {

	create: async ({ request, locals }) => {

		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();

		const image_url = formData.get('image_url');
		const description = formData.get('description');

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

		throw redirect(303, '/admin');
	}
};