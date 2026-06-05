import pool from '$lib/server/database.js';
import  { redirect } from '@sveltejs/kit';
import { access } from 'fs';


export async function load({ locals }){

    if (!locals.user) redirect(302, '/login');
   
}


export const actions = {

    create: async ({request}) =>{
        try {
        const formData = await request.formData();
        const image_url = formData.get('image_url');
        const description = formData.get('description');
        const author_id = formData.get('author_id');
        const votes = formData.get('votes');
        const created_at = formData.get('created_at');
        const image = formData.get('image');

        console.log(image_url, description, author_id, votes, created_at);

       

         if (image && image.size > 0) {
        const blob = await put(
            image.name || 'upload-${Date.now()}',
            image,
            {
                access: 'private',
                addRandomSuffix: true,
                token: BLOB_READ_WRITE_TOKEN
            }
        );
        console.log('Image uploaded successfully:', blob);
        imageUrl = blob.url;
        }

    await pool.execute(
        'INSERT INTO images (image_url, description, author_id, votes, created_at) values (?,?,?,?,?)',
        [image_url, description, author_id, votes, created_at]
    );

}catch (err) {
    if (err?.status === 303) throw err,
    console.error(err);
    return {error: 'Failed to create post'
    }
};


    throw redirect(303, '/admin/posts');

}

};