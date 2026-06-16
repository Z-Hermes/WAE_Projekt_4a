import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { createsession, hashPassword } from '$lib/server/auth';

export const actions = {
    register: async ({ request, cookies }) => {

        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        if (!username || !password) {
            return fail(400, { username, error: 'Please fill all fields' });
        }

        let result;
        try {
            [result] = await pool.execute('INSERT INTO users (username, password ) VALUES (?, ?)', [username, await hashPassword(password)]);
            console.log(result);
        } catch (err) {
            console.error(err);
            if (err.code === 'ER_DUP_ENTRY') {
                return fail(400, { username, error: 'Username already exists' });
            }
        }

        const sessionId = await createsession(result.insertId);
                cookies.set('session', sessionId, {
                    path: '/',
                    maxAge: 60 *60 * 24 * 30});
        
                throw redirect(303, '/admin');
    }
}
