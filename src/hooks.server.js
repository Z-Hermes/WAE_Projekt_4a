import { validateSession } from '$lib/server/auth';

// This hook runs before every request in the application
export async function handle({ event, resolve }) {

	// Read session cookie from browser
	const sessionId = event.cookies.get('session');

	// If a session exists, load the user from the database
	// Otherwise set user to null
	event.locals.user = sessionId
		? await validateSession(sessionId)
		: null;

	// Continue loading the requested page
	return resolve(event);
}