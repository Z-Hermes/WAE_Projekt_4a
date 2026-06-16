// redirect() sends the browser somewhere else (here: back to the home page).
import { redirect } from '@sveltejs/kit';
// invalidateSession() deletes a session row from the database (defined in auth.js).
import { invalidateSession } from '$lib/server/auth';

export const actions = {

	// "logout" matches a form with action="/logout?/logout" in the header.
	// It runs on the server when the user clicks "Log out".
	logout: async ({ cookies }) => {

		// Read the session id stored in the browser's "session" cookie.
		const sessionId = cookies.get('session');

		// Only do work if a session actually exists (avoids errors if someone
		// hits logout while not logged in).
		if (sessionId) {
			// 1) Remove the session from the database so it can't be reused.
			await invalidateSession(sessionId);

			// 2) Delete the cookie from the browser. path:'/' must match the
			//    path the cookie was created with, or it won't be removed.
			cookies.delete('session', { path: '/' });
		}

		// Send the now-logged-out user back to the home page.
		// 303 = correct redirect status after a POST (so a refresh won't re-POST).
		redirect(303, '/');
	}
};