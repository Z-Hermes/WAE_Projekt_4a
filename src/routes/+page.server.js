import pool from "$lib/server/database.js";

export async function load() {

    const [rows] = await pool.execute('SELECT description, id , image_url as url, created_at, author_id from images');

    return {
        pageTitle: "list of posts",
        posts: rows
    }
}
