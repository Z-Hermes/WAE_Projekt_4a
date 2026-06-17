import pool from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {

	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const [users] = await pool.execute(
		'SELECT bio FROM users WHERE id = ?',
		[locals.user.id]
	);

	return {
		bio: users[0].bio
	};
}

export const actions = {

	save: async ({ request, locals }) => {

		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();

		const bio = formData.get('bio');

		await pool.execute(
			'UPDATE users SET bio = ? WHERE id = ?',
			[
				bio,
				locals.user.id
			]
		);

		throw redirect(
			303,
			'/profile/' + locals.user.username
		);
	}
};