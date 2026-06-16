// Load data that should be available to every page
export function load({ locals }) {

	// Pass authenticated user from hooks.server.js
	return {
		user: locals.user
	};

}