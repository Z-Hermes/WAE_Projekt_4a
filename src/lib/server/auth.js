import pool from './database.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

// Create a secure bcrypt hash before storing a password
export async function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

// Compare a plain text password with a stored hash
export async function verifyPassword(password, hash) {
	return bcrypt.compare(password, hash);
}

// Create a new login session for a user
export async function createsession(userId) {

	// Generate a unique session ID
	const sessionId = randomUUID();

	// Session expires after 30 days
	const expiresAt = new Date(
		Date.now() + 30 * 24 * 60 * 60 * 1000
	);

	await pool.execute(
		`
        INSERT INTO sessions
        (id, user_id, expires_at)
        VALUES (?, ?, ?)
    `,
		[
			sessionId,
			userId,
			expiresAt
		]
	);

	return sessionId;
}

// Validate a session and return the logged-in user
export async function validateSession(sessionId) {

	const [rows] = await pool.execute(
		`
        SELECT
            u.id,
            u.username,
            u.role
        FROM sessions s
        JOIN users u
        ON s.user_id = u.id
        WHERE s.id = ?
        AND s.expires_at > NOW()
    `,
		[sessionId]
	);

	return rows[0] ?? null;
}

// Delete a session when the user logs out
export async function invalidateSession(sessionId) {
	await pool.execute(
		'DELETE FROM sessions WHERE id = ?',
		[sessionId]
	);
}