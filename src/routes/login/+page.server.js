import pool from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import { verifyPassword, createsession } from '$lib/server/auth';

export const actions = {

    login: async ({ request, cookies }) => {

        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        if (!username || !password) {
            return fail(400, { username, error: 'Invalid username or password' });
        }

        // Find user in database
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ? ', [username]);

        if (rows.length === 0) {
            return fail(400, { error: 'Username not found' });
        }

      if (!(await verifyPassword(password, rows[0].password))) {
    return fail(400, { error: 'Incorrect password' });
}

        // Set cookie
        const sessionId = await createsession(rows[0].id);
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 *60 * 24 * 30});

        throw redirect(303, '/admin');
    }
}   