import pool from '$lib/server/database.js';

export async function GET({params}) {

    const id = params.id;
    const [rows] = await pool.query('SELECT * from images where id=?', [id]);

    if (rows.length == 0) {
        return Response.json({message: 'Post not found'}, {status: 404})
    }

    return Response.json(rows[0]);
}

export async function DELETE({params}) {
    const id = params.id;
    const [result] = await pool.query('DELETE FROM images WHERE id=?', [id]);

    if (result.affectedRows === 0) {
        return Response.json({ message: 'Post not found'}, {status: 404})
    }
    return Response.json({message: 'Post deleted'});
}

export async function PUT({request,params}) {
    const id = params.id;
    const {image_url, description, author_id, votes, created_at,} = await request.json();
    const [result] = await pool.query('UPDATE images SET image_url = ?, description = ?, author_id = ?, votes = ?, created_at = ? where id = ?', [image_url, description, author_id, votes, created_at, id]);

    if (result.affectedRows === 0) {
        return Response.json({ message: 'Post not found'}, {status: 404})
    }
    return Response.json({message: 'Post updated'});
}