// Redirect user after logout
import { redirect } from '@sveltejs/kit';

// Remove session from database
import { invalidateSession } from '$lib/server/auth';

// Runs when user visits /logout
export async function GET({ cookies }) {

	// Read session cookie
	const sessionId = cookies.get('session');

	// If user is logged in
	if (sessionId) {

		// Delete session from database
		await invalidateSession(sessionId);

		// Remove cookie from browser
		cookies.delete('session', {
			path: '/'
		});
	}

	// Send user back to homepage
	throw redirect(303, '/');
}