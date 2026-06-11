import pool from '$lib/server/database.js';

export async function GET() {
    const [rows] = await pool.query('SELECT * from posts');
    return Response.json(rows);
}

export async function POST({request}) {

    const { image_url, description } = await request.json();

    const [result] = await pool.query('INSERT INTO posts (image_url, description) VALUES (?,?)', [image_url, description]);

    return Response.json({ "message": "Post created"},{ status: 201})


}