import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    // Holt die User-ID aus dem Cookie (wenn eingeloggt)
    const userId = event.cookies.get('userId');

    // Macht die userId überall im Server-Code über "locals" verfügbar
    event.locals.userId = userId;

    // Wenn der User nicht eingeloggt ist und versucht auf /profile zuzugreifen -> Root-Seite (/)
    if (event.url.pathname.startsWith('/profile') && !userId) {
        throw redirect(303, '/');
    }

    // Lass die Seite ganz normal laden
    return await resolve(event);
}