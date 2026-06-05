import pool from '$lib/server/database.js';
import { BLOB_READ_WRITE_TOKEN } from 'mysql2/lib/constants/types.js';

export async function load ({ params }) {

    if (!locals.user) redirect(302, '/login');
    const imageId = params.id;

    const [rows] = await pool.execute('SELECT * from images WHERE id= ?', [imageId]);

    if  (rows.length === 0) {
            error(404, 'Post not found');
    }

    return {
        event: rows[0]
    }
}


import pool from '$lib/server/database.js';
import  { redirect } from '@sveltejs/kit'

export const actions = {

    edit: async ({request, params}) =>{
        const formData = await request.formData();
        const image_url = formData.get('image_url');
        const description = formData.get('description');
        const author_id = formData.get('author_id');
        const votes = formData.get('votes');
        const created_at = formData.get('created_at');
        const id = params.id;

        console.log(image_url, description, votes, created_at);


    await pool.execute(
        'UPDATE images SET image_url = ?, description = ?, author_id = ?, votes = ?, created_at = ?,  where id = ?',
        [image_url,description,author_id,votes,created_at, id]
    );

    redirect(303, '/admin/posts');

}

};